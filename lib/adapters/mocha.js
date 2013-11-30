(function() {

    (function(runner) {
        runner.on('start', function() {
            blanket.setupCoverage();
        });

        runner.on('end', function() {
            blanket.onTestsDone();
        });

        runner.on('suite', function() {
            blanket.onModuleStart();
        });

        runner.on('test', function() {
            blanket.onTestStart();
        });

        runner.on('test end', function(test) {
            blanket.onTestDone(test.parent.tests.length, test.state === 'passed');
        });
    })(Mocha.Runner.prototype);

    var oldRun = mocha.run,
        oldCallback;

    mocha.run = function(finishCallback) {
        oldCallback = finishCallback;
    };

    blanket.beforeStartTestRunner({
        callback: function(){
            oldRun(oldCallback);
        }
    });

})();
