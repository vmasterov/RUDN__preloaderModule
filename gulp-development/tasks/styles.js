'use strict';


const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const sassCompiler = require('node-sass');
const combine = require('stream-combiner2').obj;


$.sass.compiler = sassCompiler;


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
    let manifest;
    const root = process.cwd();


    if (!isDevelopment) {
        manifest = require(root + '/' + options.srcManifestImages);
    }

    function url(urlLiteral) {

        const fileName = urlLiteral.match(/(?=\\|\/)?([0-9A-Za-zА-ЯЁа-яё_@$*()={}'"|<>:^,!.&?`#%№~ +-]+)(?=\\|\/)?/g).reverse();
        let imageURL;

        if (fileName[1] === 'images' || fileName[1] === 'upload') {
            imageURL = '/' + manifest[fileName[1] + '/' + fileName[0]];
        }

        else{
            imageURL = urlLiteral;
        }

        return imageURL;
    }


    return function() {
        return combine(
            gulp.src(options.srcFrom),
            $.if(isDevelopment, $.sourcemaps.init()),
            $.sass(),
            $.if(!isDevelopment, $.cssReplaceUrl({replace: url})),
            $.if(isDevelopment, $.sourcemaps.write()),
            $.if(!isDevelopment, combine(
                $.rev(),
                $.cleanCss(),
                $.rename({suffix: ".min"})
            )),
            gulp.dest(options.srcTo),
            $.if(!isDevelopment, combine(
                $.rev.manifest('css.json'),
                gulp.dest(options.srcManifest)
            ))
        ).on('error', $.notify.onError());
    };
};