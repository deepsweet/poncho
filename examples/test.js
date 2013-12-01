function assert(expr, msg) {
    if(!expr) throw new Error(msg || 'failed');
}

describe('test', function() {

    it('must return a greeting', function() {
        assert(window.greeting() === 'hello');
    });

});
