import { suite, test, timeout, slow, skipOnError } from 'mocha-typescript';
import { assert } from 'chai';

@suite class Suite1 {
    @test 'one'() {
        // one passes
    }
    @test 'two'() {
        // tow fails
        // throw new Error('instant fail');
    }
    @test 'three'() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 10);
        });
    }
    @test 'four'() {
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => reject(new Error('async fail')), 10);
        // });
    }
}
