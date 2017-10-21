import { suite, test, timeout, slow, skipOnError } from 'mocha-typescript';
import { assert } from 'chai';

@suite class TestSuite1 {
    @test 'one'() {
        // passes
    }
    @test 'two'() {
        // fails
        // throw new Error('instant fail');
    }
    @test 'three'() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 10);
        });
    }
}
