const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const cpu = process.env.SERVER_2_CPU;
const PORT = process.env.SERVER_2_PORT;

app.get('/', (req, res) => {
    res.send(`Response from server ${cpu} on port ${PORT}`);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
