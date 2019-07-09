describe("RUDN Preloader Module", function(){
    it("Expected that the module to throw an error if selector will be not passed", function(){
        assert.throws(
            function () {
                preloaderModule.init({
                    position: 'append'
                })
            },
            'Preloader module (init method): an element for the preloader no passed'
        );
    });

    it("Expected that the module to throw an error if selector will be not found", function(){
        assert.throws(
            function () {
                preloaderModule.init({
                    element: $('.test-preloader-block__img1'),
                    position: 'append'
                })
            },
            'Preloader module (init method): can`t find element for the preloader'
        );
    });

    it("Expected that the module to throw an error if element will be no an jQuery selector", function(){
        const testValues = [
            1,
            0,
            'string',
            {prop: 'value'},
            NaN,
            true,
            false,
            null
        ];

        testValues.forEach((item) => {
            assert.throws(
                function () {
                    preloaderModule.init({
                        element: item,
                        position: 'append'
                    })
                },
                'Preloader module (init method): an element is not a jQuery object'
            );
        });
    });
});
