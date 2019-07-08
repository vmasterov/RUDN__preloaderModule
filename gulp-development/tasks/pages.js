'use strict';


const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function(options) {
    const manifestCss = gulp.src(options.srcManifestCss, {'allowEmpty': true});
    const manifestCssLibs = gulp.src(options.srcManifestCssLibs, {'allowEmpty': true});
    const manifestJs = gulp.src(options.srcManifestJs, {'allowEmpty': true});
    const manifestJsModules = gulp.src(options.srcManifestJsModules, {'allowEmpty': true});
    const manifestJsLibs = gulp.src(options.srcManifestJsLibs, {'allowEmpty': true});
    const manifestImages = gulp.src(options.srcManifestImages, {'allowEmpty': true});

    return function() {
        return combine(
            gulp.src(options.srcFrom, {since: gulp.lastRun('pages')}),
            $.if(!isDevelopment, combine(
                $.revRewrite({
                    manifest: manifestJs,
                    replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.php']
                }),
                $.revRewrite({
                    manifest: manifestJsModules,
                    replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.php']
                }),
                $.revRewrite({
                    manifest: manifestJsLibs,
                    replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.php']
                }),
                $.revRewrite({
                    manifest: manifestCss,
                    replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.php']
                }),
                $.revRewrite({
                    manifest: manifestCssLibs,
                    replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.php']
                }),
                $.revRewrite({
                    manifest: manifestImages,
                    replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.php', '.jpeg', '.jpg', '.png', '.gif', '.svg']
                })
            )),
            gulp.dest(options.srcTo)
        );
    }
};
