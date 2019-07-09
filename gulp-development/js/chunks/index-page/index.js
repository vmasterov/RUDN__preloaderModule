// This page
const toggleButton = $('.js__preloader-button');
toggleButton.on('click', function () {
    const it = $(this);
    if (it.hasClass('btn-success')) {
        preloaderModule.init({
            element: $('.test-preloader-block__img'),
            position: 'append'
        });
        it.removeClass('btn-success').addClass('btn-danger').text('Hide preloader');
    }
    else{
        preloaderModule.destroy({
            element: $('.test-preloader-block__img'),
            position: 'append'
        });
        it.removeClass('btn-danger').addClass('btn-success').text('Show preloader');
    }
});