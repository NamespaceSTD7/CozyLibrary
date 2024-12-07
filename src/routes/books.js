const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200);
        res.json(books);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    const { book } = req.body;
    const newBook = new Book(book);
    
    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { book } = req.body; // если в book нет полей - ошибки не будет, а надо
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, book, {new: true});
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Book.deleteOne({ _id: id });
        res.status(204).end();
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;