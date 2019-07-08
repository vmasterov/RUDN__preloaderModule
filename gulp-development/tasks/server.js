'use strict';


const browserSync = require('browser-sync').create();


module.exports = function(options) {
    return function() {
        browserSync.init({
            server: options.server
        });

        browserSync.watch(options.watch).on('change', browserSync.reload);
    }
};