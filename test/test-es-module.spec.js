import { assert } from "chai"
import EsTestModule from '../gulp-development/js/es-modules/test-es-module';


describe( 'EsTestModules test', () =>{
    const esTestModule = new EsTestModule;
    
    it( 'Name should not be an empty string', () =>{
        assert(esTestModule.sayHi('Vladimir') === true, 'Expected that name should not be an empty string');
    });
    
    it( 'Name should not be an empty string', () =>{
        assert(esTestModule.sayHi() === false, 'Expected that name should not be an empty string');
    });
});