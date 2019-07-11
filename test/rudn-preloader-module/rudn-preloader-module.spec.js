describe("RUDN Preloader Module", function () {
    const testValues = [
        1,
        0,
        'string',
        {prop: 'value'},
        NaN,
        true,
        false,
        null,
        function () {
            alert(1);
        }
    ];

    describe("Test settings of init method", function () {
        describe("Settings.element", function () {
            it("Throw an error if element will be not passed", function () {
                assert.throws(
                    function () {
                        preloaderModule.init({
                            position: 'append'
                        })
                    },
                    'Preloader module (INIT METHOD): an element for the preloader no passed. Pass an element'
                );
            });

            it("Throw an error if element will be not found", function () {
                assert.throws(
                    function () {
                        preloaderModule.init({
                            element: $('.test-preloader-block__img1'),
                            position: 'append'
                        })
                    },
                    'Preloader module (INIT METHOD): can\'t find element for the preloader. Check if element is correct?'
                );
            });

            testValues.forEach((item) => {
                it("Throw an error if element will be not jQuery selector: " + item, function () {
                    assert.throws(
                        function () {
                            preloaderModule.init({
                                element: item,
                                position: 'append'
                            })
                        },
                        'Preloader module (INIT METHOD): an element is not a jQuery object'
                    );
                });
            });
        });


        describe("Settings.position", function () {
            testValues.forEach((item) => {
                it("Throw an error if position will be not one of keywords: " + item, function () {
                    assert.throws(
                        function () {
                            preloaderModule.init({
                                element: $('.test-preloader-block__img'),
                                position: item
                            })
                        },
                        'Preloader module (INIT METHOD): incorrect position of the preloader. Use: "before", "after", "append" keywords'
                    );
                });
            });
        });


        describe("Settings.template", function () {
            testValues.forEach((item) => {
                it("Throw an error if template will be not valid html string: " + item, function () {
                    assert.throws(
                        function () {
                            preloaderModule.init({
                                element: $('.test-preloader-block__img'),
                                position: 'append',
                                template: item
                            })
                        },
                        'Preloader module (INIT METHOD): template should be a valid html string'
                    );
                });
            });
        });
    });


    describe("Test settings of destroy method", function () {
        beforeEach(() => {
            preloaderModule.init({
                element: $('.test-preloader-block__img'),
                position: 'append'
            })
        });

        afterEach(() => {
            preloaderModule.destroy({
                element: $('.test-preloader-block__img'),
                position: 'append',
                preloader: $('.preloader-module__wrapper')
            })
        });

        describe("Settings.element", function () {
            it("Throw an error if element will be not passed", function () {
                assert.throws(
                    function () {
                        preloaderModule.destroy({
                            position: 'append'
                        })
                    },
                    'Preloader module (DESTROY METHOD): an element for the preloader no passed'
                );
            });

            it("Throw an error if element will be not found", function () {
                assert.throws(
                    function () {
                        preloaderModule.destroy({
                            element: $('.test-preloader-block__img1'),
                            position: 'append'
                        })
                    },
                    'Preloader module (DESTROY METHOD): can\'t find element for the preloader'
                );
            });

            testValues.forEach((item) => {
                it("Throw an error if element will be not jQuery selector: " + item, function () {
                    assert.throws(
                        function () {
                            preloaderModule.destroy({
                                element: item,
                                position: 'append'
                            })
                        },
                        'Preloader module (DESTROY METHOD): an element is not a jQuery object'
                    );
                });
            });
        });

        describe("Settings.preloader", function () {
            it("Throw an error if preloader will be not passed", function () {
                assert.throws(
                    function () {
                        preloaderModule.destroy({
                            element: $('.test-preloader-block__img'),
                            position: 'append'
                        })
                    },
                    'Preloader module (DESTROY METHOD): an preloader for the preloader no passed. Pass an preloader'
                );
            });

            it("Throw an error if preloader will be not found", function () {
                assert.throws(
                    function () {
                        preloaderModule.destroy({
                            element: $('.test-preloader-block__img'),
                            position: 'append',
                            preloader: $('.test-preloader-block__img1')
                        })
                    },
                    'Preloader module (DESTROY METHOD): can\'t find preloader for the preloader. Check if preloader is correct?'
                );
            });

            testValues.forEach((item) => {
                it("Throw an error if element will be not jQuery selector: " + item, function () {
                    assert.throws(
                        function () {
                            preloaderModule.destroy({
                                element: $('.test-preloader-block__img'),
                                position: 'append',
                                preloader: item
                            })
                        },
                        'Preloader module (DESTROY METHOD): an preloader is not a jQuery object'
                    );
                });
            });
        });
    });
});
