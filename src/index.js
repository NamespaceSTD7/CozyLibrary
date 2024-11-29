const express = require('express');

//const errorMiddleware = require('./middlewares/error');

const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');

const app = express();
app.use(express.json());

//app.use(express.urlencoded())
//app.set('view engine', 'ejs');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', booksRouter);

app.use(errorMiddleware);

async function start(PORT, DB_URL) {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT)
    } catch (e) {
        console.log(e);
    }
}

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;
app.listen(PORT);