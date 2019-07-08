'use strict';


const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;


module.exports = function(options) {
    return function() {
        return combine(
            gulp.src(options.srcFrom, {since: gulp.lastRun('files')}),
            gulp.dest(options.srcTo)
        ).on('error', $.notify.onError());
    };
};