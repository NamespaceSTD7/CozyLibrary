const express = require('express');
const Book = require('../db/models/book');
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();
const { toDTO } = require('../routes/models/book');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        const apiBooks = books.map(book => toDTO(book));
        res.status(200);
        res.json({books: apiBooks});
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера', error: err.message });
    }
});

router.get('/:id', validateObjectId, async(req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Книга не найдена' });
        }
        res.status(200).json({book: toDTO(book)});
    } catch(err) {
        res.status(500).json({ message: 'Ошибка сервера', error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { book } = req.body;

    if (!book || !book.title || !book.authors || !book.description) {
        return res.status(400).json({
            message: 'Некорректное тело запроса. Необходимо указать хотя бы title, authors и description.' 
        });
    }
    
    try {
        const newBook = new Book(book);
        await newBook.save();
        res.status(201).json({book: toDTO(newBook)});
    } catch(err) {
        res.status(500).json({ message: 'Ошибка сервера', error: err.message });
    }
});

router.patch('/:id', validateObjectId, async (req, res) => {
    const { id } = req.params;
    const { book } = req.body;

    if (!book || (!book.title && !book.author && !book.description && !book.isbn && !book.coverUrl && !book.fileUrl)) {
        return res.status(400).json({ message: 'Некорректное тело запроса. Необходимо указать хотя бы одно поле.' });
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, book, {new: true});
        if (!updatedBook) {
            return res.status(404).json({ message: 'Книга не найдена' });
        }
        res.status(200).json({book: toDTO(updatedBook)});
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера', error: err.message });
    }
});

router.delete('/:id', validateObjectId, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.deleteOne({ _id: id });
        if (deletedBook.deletedCount === 0) {
            return res.status(404).json({ message: 'Книга не найдена' });
        }
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера', error: err.message });
    }
});

module.exports = router;