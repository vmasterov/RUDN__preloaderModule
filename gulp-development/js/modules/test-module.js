;
let testModule = (function () {
    let sayHi = function sayHi () {
        console.log('Hello from test-module');
    };

    return {
        sayHi: sayHi
    }
})();