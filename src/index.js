require('dotenv').config();
const config = require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./routes/api');

const app = express();
app.use(express.json());

app.use('/api/v1', apiRouter);

mongoose.connect(config.dbUrl)
    .then(() => app.listen(config.port, () => console.log(`Server started on port ${config.port}`)))
    .catch(e => console.log(e));