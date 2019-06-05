const cluster = require('cluster');
const worker = 8;


cluster.setupMaster({
    exec: 'worker.js'
});

for (let i = 0; i < worker; i++) {
    cluster.fork();
}
