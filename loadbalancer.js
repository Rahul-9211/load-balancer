const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const servers = [
    { url: process.env.SERVER_1_URL, activeConnections: 0 },
    { url: process.env.SERVER_2_URL, activeConnections: 0 },
    { url: process.env.SERVER_3_URL, activeConnections: 0 }
];

const LOAD_BALANCER_PORT = process.env.LOAD_BALANCER_PORT;

let currentServerIndex = 0; // Initialize the index for round robin

const serverHandler = async (req, res) => {
    // Uncomment the desired load balancing algorithm

    // Round Robin Algorithm
    const currentServer = servers[currentServerIndex];
    currentServerIndex = (currentServerIndex + 1) % servers.length;

    /*
    // Least Connections Algorithm
    const currentServer = servers.reduce((prev, curr) => 
        (prev.activeConnections < curr.activeConnections) ? prev : curr
    );
    */

    // Increment the active connections for the selected server
    currentServer.activeConnections++;

    try {
        const response = await axios({
            url: currentServer.url + req.url,
            method: req.method,
            headers: req.headers,
            data: req.body
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error forwarding request:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        // Decrement the active connections after the response is sent
        currentServer.activeConnections--;
    }
}

// Serve favicon.ico image
app.get('/favicon.ico', (req, res) => res.send("test"));

app.use((req, res) => serverHandler(req, res));

app.listen(LOAD_BALANCER_PORT, () => {
    console.log(`Load balancer running on port ${LOAD_BALANCER_PORT}`);
});
