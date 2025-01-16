// vertical scaling --->>>> using cluster module

const express = require('express');
const app = express();
const cluster = require('cluster');
const ncpus = require('os').cpus().length;
const port = process.env.PORT || 3000;

// Add basic health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', pid: process.pid });
});

// Add some basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < ncpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.id} died with code ${code} and signal ${signal}`);
        console.log('Starting a new worker');
        cluster.fork();
    });

    // Log when a worker is online
    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });
} else {
   

    app.listen(port, '0.0.0.0', () => {
        console.log(`Worker ${process.pid} is listening on port ${port}`);
    });
     // Add basic request logging
     app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Worker ${process.pid}`);
        next();
    });

    app.get('/', (req, res) => {
        let counter = 0;
        for (let i = 0; i < 10000000; i++) {
            counter++;
        }
        res.send(`Worker ${process.pid} - Counter: ${counter}`);
    });
}



