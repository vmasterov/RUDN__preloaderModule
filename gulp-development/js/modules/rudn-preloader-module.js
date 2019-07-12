;var preloaderModule = (function(){

    /**
     *
     * @param {object} settings
     *
     * @param {jQuery} settings.element - element that need to preloader.
     * Default: -
     *
     * @param {string} settings.template - markup for the preloader.
     * Default: template generated _getDefaultTemplate function.
     * Css class: preloader-module__wrapper
     *
     * @param {string} settings.position - where will the preloader be located (before, after, append).
     * Default: after
     */
    var init = function init(settings){
        _isSettingsValid(settings, _methodName.init);

        var element = settings.element;
        var template = settings.template || _getDefaultTemplate();
        var position = settings.position || 'after';

        if (element.hasClass('has-preloader')) {
            return;
        }

        element.addClass('has-preloader').css('position', 'relative');

        _positions.init[position](element, template);
    };



    /**
     *
     * @param {object} settings
     *
     * @param {jQuery} settings.element - element that need to preloader.
     * Default: -
     *
     * @param {jQuery} settings.preloader - a template from init method's setting.template
     * Default: -
     *
     * @param {function} settings.callback - will be executed when preloader's fade animation is finished
     * Default: -
     */
    var destroy = function destroy(settings){
        _isSettingsValid(settings, _methodName.destroy);

        var element = settings.element;
        var preloader = settings.preloader;
        var callback = settings.callback;

        _positions.destroy(element, preloader, callback);
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



    function _isHTML(string, method) {
        var container = document.createElement('div');

        container.innerHTML = string;

        for (var children = container.childNodes, i = children.length; i--;) {
            if (isValidHTML(children[i].tagName)) {
                throw `Preloader module (${method} METHOD): script tag is not valid`;
            }
            return children[i].nodeType === 1;
        }
    }



    function isValidHTML(tag) {
        return tag === 'SCRIPT';
    }



    var _methodName = {
        init: 'INIT',
        destroy: 'DESTROY'
    };



    function _isSettingsValid(settings, method) {
        // Test of settings.element
        if (typeof settings.element === 'undefined') {
            throw `Preloader module (${method} METHOD): an element for the preloader no passed. Pass an element`;
        }

        else if (settings.element && settings.element instanceof $ && !settings.element.length) {
            throw `Preloader module (${method} METHOD): can't find element for the preloader. Check if element is correct?`;
        }

        else if (typeof settings.element !== 'undefined' && !(settings.element instanceof $)) {
            throw `Preloader module (${method} METHOD): an element is not a jQuery object`;
        }


        // Test of settings.position
        if (
            method === _methodName.init &&
            typeof settings.position !== 'undefined' &&
            settings.position !== 'before' &&
            settings.position !== 'after' &&
            settings.position !== 'append'
        ) {
            throw `Preloader module (${method} METHOD): incorrect position of the preloader. Use: "before", "after", "append" keywords`;
        }


        // Test of settings.template
        if (typeof settings.template !== 'undefined' && !_isHTML(settings.template, method)) {
            throw `Preloader module (${method} METHOD): template should be a valid html string`;
        }


        // Test of settings.preloader
        if (method === _methodName.destroy && typeof settings.preloader === 'undefined') {
            throw `Preloader module (${method} METHOD): an preloader for the preloader no passed. Pass an preloader`;
        }

        else if (method === _methodName.destroy && settings.preloader && settings.preloader instanceof $ && !settings.preloader.length) {
            throw `Preloader module (${method} METHOD): can't find preloader for the preloader. Check if preloader is correct?`;
        }

        else if (method === _methodName.destroy && typeof settings.preloader !== 'undefined' && !(settings.preloader instanceof $)) {
            throw `Preloader module (${method} METHOD): an preloader is not a jQuery object`;
        }

        // Test of settings.callback
        if (method === _methodName.destroy && typeof settings.callback !== 'undefined' && !(settings.callback instanceof Function)) {
            throw `Preloader module (${method} METHOD): callback for the preloader is not a function`;
        }
    }



    var _positions = {
        init: {
            before: function(element, template) {
                element.before(template);
            },
            after: function(element, template) {
                element.after(template);
            },
            append: function(element, template) {
                element.append(template);
            }
        },
        destroy: function(element, preloader, callback) {
            element.parent().find('.' + preloader.get(0).className).fadeOut(function(){
                $(this).remove();

                element.removeClass('has-preloader').css('position', '');

                if (callback) {
                    callback.apply(null, arguments);
                }
            });
        }
    };



    return {
        init: init,
        destroy: destroy
    };
})();