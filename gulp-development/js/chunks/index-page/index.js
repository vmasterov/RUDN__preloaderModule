// This page
const toggleButton = $('.js__preloader-button');

toggleButton.on('click', function () {
    const it = $(this);

    if (it.hasClass('btn-success')) {
        if (it.closest('.test-preloader-block').hasClass('js__custom-preloader')) {
            preloaderModule.init({
                element: it.closest('.test-preloader-block').find('.test-preloader-block__img'),
                position: 'append',
                template: getCustomTemplate()
            });
        }

        else {
            preloaderModule.init({
                element: it.closest('.test-preloader-block').find('.test-preloader-block__img'),
                position: 'append'
            });
        }

        it.removeClass('btn-success').addClass('btn-danger').text('Hide preloader');
    }


    else{
        if (it.closest('.test-preloader-block').hasClass('js__custom-preloader')) {
            it.attr('disabled', true);

            preloaderModule.destroy({
                element: it.closest('.test-preloader-block').find('.test-preloader-block__img'),
                preloader: it.closest('.test-preloader-block').find('.custom-preloader'),
                callback: function () {
                    it.attr('disabled', false).removeClass('btn-danger').addClass('btn-success').text('Show different color preloader');
                }
            });
        }

        else {
            it.attr('disabled', true);

            preloaderModule.destroy({
                element: it.closest('.test-preloader-block').find('.test-preloader-block__img'),
                preloader: it.closest('.test-preloader-block').find('.preloader-module__wrapper'),
                callback: function () {
                    it.attr('disabled', false).removeClass('btn-danger').addClass('btn-success').text('Show animate preloader');
                }
            });
        }
    }
});


// Helpers
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



function getCustomTemplate() {
    return '<div class="custom-preloader" style="' +
        'position: absolute; ' +
        'width: 100%; ' +
        'height: 100%; ' +
        'background-color: rgba('+ getRandomInt(0, 256) + ',' + getRandomInt(0, 256) + ',' + getRandomInt(0, 256) + ',0.8); ' +
        'top: 0; ' +
        'left: 0;' +
        '"></div>';
}