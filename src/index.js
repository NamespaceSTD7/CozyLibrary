require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');

const app = express();
app.use(express.json());

app.use(session({ secret: process.env.SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', booksRouter);

async function start(PORT, DB_URL) {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;
start(PORT, DB_URL);