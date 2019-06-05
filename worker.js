const  express = require('express');
const app = express();

console.log(`started worker`);
// first api which just responds to the request without any processing
app.get('/ping', (req, res) => {
    res.send('OK');
});

// second api which waits for 50 milli seconds before responding
app.get('/heavy-ping', (req, res) => {
    setTimeout(() => {
        // console.info("eating time for demo");
        res.send('heavy pong');
    }, 50)
});

app.listen(8080);
