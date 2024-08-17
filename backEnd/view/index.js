const express = require('express');
const app = express();
const { connectDb } = require('../config/connectDb');
const router = require('../routes/routes');

const PORT = 3002;

connectDb('mongodb://localhost:27017/CityAssist');
//middleware
app.use(express.json());
//prefix route
app.use('', router);
//server port number
app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
});

