const loadtest = require('loadtest');
require('should/should');
const { workers } = require('../constants');

describe("Performance Test", function() {
    const noRequestPerHour = 100000;
    const avgRequestTime = 1000;
    const maxSeconds = 30;
    const concurrency = 450;

    it("performance testing /heaving-ping", function(done) {
        this.timeout(1000 * 60);
        var options = {
            "url": 'http://localhost:8080/heavy-ping',
            "maxSeconds": maxSeconds,
            "concurrency": concurrency,
            "statusCallback": statusCallback
        };
        var gLatency;
        function statusCallback(latency, result, error) {
            gLatency = latency;
        }
        var operation = loadtest.loadTest(options, function(error) {
            if (error) {
                console.error('Got an error: %s', error);
            } else if (operation.running == false) {
                console.info("\n==============================\n");
                console.info("Test duration in seconds: " + maxSeconds);
                console.info("Concurrency: " + concurrency);
                console.info("workers: " + workers);
                console.info("Requests per hour: " + noRequestPerHour);
                console.info("Avg request time(Millis): " + avgRequestTime);
                console.info("\n==============================\n");
                console.info("Total Requests :", gLatency.totalRequests);
                console.info("Total Failures :", gLatency.totalErrors);
                console.info("Requests/Second :", gLatency.rps);
                console.info("Requests/Hour :", (gLatency.rps * 3600));
                console.info("Avg Request Time:",gLatency.meanLatencyMs);
                console.info("Min Request Time:",gLatency.minLatencyMs);
                console.info("Max Request Time:",gLatency.maxLatencyMs);
                console.info("Percentiles :", gLatency.percentiles);
                console.info("\n===============================\n");
                gLatency.totalErrors.should.equal(0);
                (gLatency.rps * 3600).should.be.greaterThan(noRequestPerHour);
                (gLatency.meanLatencyMs).should.be.below(avgRequestTime);
                done();
            }
        });
    });
});
