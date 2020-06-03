// This page
const toggleButtonAnim = $('.js__preloader-anim-button');
toggleButtonAnim.on('click', function () {
    const it = $(this);
    if (it.hasClass('btn-success')) {
        preloaderModule.init({
            element: $('.test-preloader-block__img.img-anim'),
            position: 'append'
        });
        it.removeClass('btn-success').addClass('btn-danger').text('Hide preloader');
    }
    else{
        it.prop('disabled', true);
        preloaderModule.destroy({
            element: $('.test-preloader-block__img.img-anim'),
            preloader: $('.preloader-module__wrapper'),
            callback: function() { it.prop('disabled', false) },
            arguments: []
        });
        it.removeClass('btn-danger').addClass('btn-success').text('Show animate preloader');
    }
});

const toggleButtonColor = $('.js__preloader-color-button');
toggleButtonColor.on('click', function () {
    const it = $(this);
    if (it.hasClass('btn-success')) {
        preloaderModule.init({
            element: $('.test-preloader-block__img.img-color'),
            position: 'append',
            template: '<div class="custom-preloader" style="' +
                'position: absolute; ' +
                'width: 100%; ' +
                'height: 100%; ' +
                'background-color: rgba('+ getRandomInt(0, 256) + ',' + getRandomInt(0, 256) + ',' + getRandomInt(0, 256) + ',0.8); ' +
                'top: 0; ' +
                'left: 0;' +
                '"></div>'
        });
        it.removeClass('btn-success').addClass('btn-danger').text('Hide preloader');
    }
    else{
        it.prop('disabled', true);
        preloaderModule.destroy({
            element: $('.test-preloader-block__img.img-color'),
            preloader: $('.custom-preloader'),
            callback: function() { it.prop('disabled', false) },
            arguments: []
        });
        it.removeClass('btn-danger').addClass('btn-success').text('Show different color preloader');
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}