// This page
const toggleButton = $('.js__preloader-button');
toggleButton.on('click', function () {
    const it = $(this);
    if (it.hasClass('btn-success')) {
        preloaderModule.init({
            element: $('.test-preloader-block__img'),
            position: 'append',
            /*template: '<div class="custom-preloader" style="' +
            'position: absolute; ' +
            'width: 100%; ' +
            'height: 100%; ' +
            'background-color: rgba('+ getRandomInt(0, 256) + ',' + getRandomInt(0, 256) + ',' + getRandomInt(0, 256) + ',0.8); ' +
            'top: 0; ' +
            'left: 0;' +
            '"></div>'*/
        });
        it.removeClass('btn-success').addClass('btn-danger').text('Hide preloader');
    }
    else{
        preloaderModule.destroy({
            element: $('.test-preloader-block__img'),
            preloader: $('.preloader-module__wrapper')
        });
        it.removeClass('btn-danger').addClass('btn-success').text('Show preloader');
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}