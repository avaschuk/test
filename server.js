const  express = require('express');
const app = express();
const throng = require('throng');
const { workers } = require('./constants');

function startMaster() {
    console.log('server started');
}

function startWorker(id) {
    console.log(`started worker number: ${id}`);
    // first api which just responds to the request without any processing
    app.get('/ping', (req, res) => {
        res.send('pong');
    });

    // second api which waits for 50 milli seconds before responding
    app.get('/heavy-ping', (req, res) => {
        setTimeout(() => {
            console.info("eating time for demo");
            res.send('heavy pong');
        }, 50)
    });

    app.listen(8080);
}

throng({
    workers,
    master: startMaster,
    start: startWorker,
});
