'use strict';


const gulp = require('gulp');


module.exports = function(options) {
    return function() {
        gulp.watch(options.srcFrom.watchPages, gulp.series('pages'));
        gulp.watch(options.srcFrom.watchStyles, gulp.series('styles'));
        gulp.watch(options.srcFrom.watchJs, gulp.series('js:chunks'));
        gulp.watch(options.srcFrom.watchImages, gulp.series('images'));
    };
};
