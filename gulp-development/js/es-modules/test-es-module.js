export default class EsTestModule {
    constructor () {}

    sayHi(name) {
        if (!name) {
            console.error('Name should not be an empty string');
            return false;
        }
        else{
            console.log(`${name}! Hello from Es-test-module!`);
            return true;
        }
    }
}
