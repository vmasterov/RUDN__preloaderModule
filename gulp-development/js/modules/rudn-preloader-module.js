;var preloaderModule = (function(){

    /**
     *
     * @param {object} settings
     * @param {jQuery} settings.element - element that need to preloader
     * @param {string} settings.template - markup for the preloader
     * @param {string} settings.position - where will the preloader be located (before or after the specified element)
     */
    var init = function init(settings){
        _isSettingsValid(settings, methodName.init);

        var element = settings.element;
        var template = settings.template || _getDefaultTemplate();
        var position = settings.position || 'after';

        if (element.hasClass('has-preloader')) {
            return;
        }

        element.addClass('has-preloader').css('position', 'relative');

        switch(position) {
            case 'before':
                element.before(template);
                break;
            case 'after':
                element.after(template);

                break;
            case 'append':
                element.append(template);
                break;
        }
    };



    /**
     *
     * @param {object} settings
     * @param {jQuery} settings.element - element that need to preloader
     * @param {jQuery} settings.preloader - the preloader
     * @param {string} settings.position - where will the preloader be located (before or after the specified element)
     */
    var destroy = function destroy(settings){
        _isSettingsValid(settings, methodName.destroy);

        var element = settings.element;
        var preloader = settings.preloader || $('.preloader-module__wrapper');
        var position = settings.position || 'after';

        switch(position) {
            case 'before':
                element.prep(preloader).fadeOut(function(){
                    $(this).remove();

                    element.removeClass('has-preloader').css('position', '');
                });
                break;
            case 'after':
                element.next(preloader).fadeOut(function(){
                    $(this).remove();

                    element.removeClass('has-preloader').css('position', '');
                });
                break;
            case 'append':
                element.find(preloader).fadeOut(function(){
                    $(this).remove();

                    element.removeClass('has-preloader').css('position', '');
                });
                break;
        }
    };



    //  Helpers
    function _getDefaultTemplate(){
        var wrapper = $('<div></div>', {
            'class': 'preloader-module__wrapper',
            'style': 'position: absolute; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.8)'
        });
        var spinner = $('<div class="preloader-module__spinner" style="position: absolute; width: 100%; height: 100%;"><svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve" class="preload-img" style="position: absolute; top: calc(50% - 32px); left: calc(50% - 32px)"><g><circle cx="16" cy="64" r="14" fill="#007ac1" fill-opacity="1"/><circle cx="16" cy="64" r="12.344" fill="#007ac1" fill-opacity="1" transform="rotate(45 64 64)"/><circle cx="16" cy="64" r="10.531" fill="#007ac1" fill-opacity="1" transform="rotate(90 64 64)"/><circle cx="16" cy="64" r="8.75" fill="#007ac1" fill-opacity="1" transform="rotate(135 64 64)"/><circle cx="16" cy="64" r="8.063" fill="#007ac1" fill-opacity="1" transform="rotate(180 64 64)"/><circle cx="16" cy="64" r="6.063" fill="#007ac1" fill-opacity="1" transform="rotate(225 64 64)"/><circle cx="16" cy="64" r="4.438" fill="#007ac1" fill-opacity="1" transform="rotate(270 64 64)"/><circle cx="16" cy="64" r="3.375" fill="#007ac1" fill-opacity="1" transform="rotate(315 64 64)"/><animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite"></animateTransform></g></svg></div>');

        wrapper.append(spinner);

        return wrapper;
    }



    function _isHTML(string) {
        var container = document.createElement('div');

        container.innerHTML = string;

        for (var children = container.childNodes, i = children.length; i--; ) {
            return children[i].nodeType === 1;
        }
    }



    function _isSettingsValid(settings, method) {
        // Test of settings.element
        if (typeof settings.element === 'undefined') {
            throw `Preloader module (${method}): an element for the preloader no passed`;
        }

        else if (settings.element && settings.element instanceof $ && !settings.element.length) {
            throw `Preloader module (${method}): can't find element for the preloader`;
        }

        else if (typeof settings.element !== 'undefined' && !(settings.element instanceof $)) {
            throw `Preloader module (${method}): an element is not a jQuery object`;
        }


        // Test of settings.position
        if (
            typeof settings.position !== 'undefined' &&
            settings.position !== 'before' &&
            settings.position !== 'after' &&
            settings.position !== 'append'
        ) {
            throw `Preloader module (${method}): incorrect position of the preloader`;
        }


        // Test of settings.template
        if (typeof settings.template !== 'undefined' && !_isHTML(settings.template)) {
            throw `Preloader module (${method}): template should be a valid html string`;
        }


        // Test of settings.preloader
        if (settings.preloader && settings.preloader instanceof $ && !settings.preloader.length) {
            throw `Preloader module (${method}): can't find preloader for the preloader`;
        }

        else if (typeof settings.preloader !== 'undefined' && !(settings.preloader instanceof $)) {
            throw `Preloader module (${method}): an preloader is not a jQuery object`;
        }
    }



    var methodName = {
      init: 'INIT METHOD',
      destroy: 'DESTROY METHOD'
    };



    return {
        init: init,
        destroy: destroy
    };
})();