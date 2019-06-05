const cluster = require('cluster');
const { worker } = require('constants');


cluster.setupMaster({
    exec: 'worker.js'
});

for (let i = 0; i < worker; i++) {
    cluster.fork();
}
