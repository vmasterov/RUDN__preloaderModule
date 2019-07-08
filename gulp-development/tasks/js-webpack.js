'use strict';


const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const gulplog = require('gulplog');
const path = require('path');
const named = require('vinyl-named');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const assetsPlugin = require('assets-webpack-plugin');
const combine = require('stream-combiner2').obj;


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function (options) {
    let firstBuildReady = false;
    const root = process.cwd();


    function done(err, stats) {
        firstBuildReady = true;

        if (err) {
            return;
        }

        gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({colors: true}));
    }


    let webpackOptions = {
        entry: {
            'gulp-main': options.entry
        },
        output: {
            publicPath: '/js/',
            filename: isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js'
        },
        watch: isDevelopment,
        devtool: isDevelopment ? 'cheap-module-inline-source-map' : false,
        mode: isDevelopment ? 'development' : 'production',
        module: {
            rules: [{
                test: /\.js$/,
                include: path.join(root, options.includeBase),
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            }]
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin()
        ]
    };


    if (!isDevelopment) {
        webpackOptions.plugins.push(new assetsPlugin({
            filename: 'js.json',
            path: process.cwd() + '/' + options.manifest,
            processOutput(assets) {
                for (let key in assets) {
                    assets[key + '.js'] = assets[key].js.slice(webpackOptions.output.publicPath.length);
                    delete assets[key];
                }

                return JSON.stringify(assets);
            }
        }));
    }


    return function (callback) {
        return combine(
            gulp.src(options.srcFrom),
            $.plumber({
                errorHandler: $.notify.onError(
                    err => ({
                        title: 'Webpack',
                        message: err.message
                    })
                )
            }),
            named(),
            webpackStream(webpackOptions, null, done),
            $.if(!isDevelopment, $.uglify()),
            gulp.dest(options.srcTo).on('data', function () {
                if (firstBuildReady) {
                    callback();
                }
            })
        ).on('error', $.notify.onError());
    }
};
