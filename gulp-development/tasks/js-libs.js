'use strict';


const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function(options) {
    return function() {
        return combine(
            gulp.src(options.srcFrom),
            $.concat('gulp-libs.js'),
            $.if(!isDevelopment, combine(
                $.rev(),
                $.uglifyEs.default(),
                $.rename({suffix: ".min"})
            )),
            gulp.dest(options.srcTo),
            $.if(!isDevelopment, combine(
                $.rev.manifest('js-libs.json'),
                gulp.dest(options.manifest)
            ))
        ).on('error', $.notify.onError());
    };
};