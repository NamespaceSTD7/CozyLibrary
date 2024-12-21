const express = require('express');
const router = express.Router();

const booksRouter = require('./books');
const authRouter = require('./auth');

router.use('/books', booksRouter);
router.use('/auth', authRouter);

module.exports = router;