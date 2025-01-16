const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const cpu = process.env.SERVER_1_CPU;
const PORT = process.env.SERVER_1_PORT;

app.get('/', (req, res) => {
    // Uncomment the following lines if you want to simulate a delay
    // setTimeout(() => {
    //     console.log("server id settimeout  ", serverId);
    // }, 10000);
    res.send(`Response from server ${cpu} on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
}); 