const express = require('express');
const { v4: uuid } = require('uuid');
const router = express.Router();

class Book {
    constructor(title = "", authors = [], description = "", isbn = "", coverUrl = "", fileUrl = "", id = uuid()) {
        this.id = id;
        this.title = title;
        this.authors = authors;
        this.description = description;
        this.isbn = isbn;
        this.coverUrl = coverUrl;
        this.fileUrl = fileUrl;
    }
}

const library = {
    books: [
        new Book("Book1", ["Author1", "Author2"], "Description1", "ISBN1", "CoverUrl1", "FileUrl1"),
        new Book("Book2", ["Author3", "Author4"], "Description2", null, "CoverUrl2", "FileUrl2")
    ],
};

app.get('/', (req, res) => {
    res.status(200);
    res.json(library.books);
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
    const book = library.books.find((b) => b.id === id);

    if (book) {
        res.status(200);
        res.json(book);
    } else {
        //res.sendStatus(404);
        res.status(404);
        res.json('404 | Страница не найдена');
        // либо middleware ошибки
    }
});

app.post('/', (req, res) => {
    const { title, authors, description, isbn, coverUrl, fileUrl } = req.body; //что если не все поля переданы
    const newBook = new Book(title, authors, description, isbn, coverUrl, fileUrl);
    library.books.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, authors, description, isbn, coverUrl, fileUrl } = req.body; //что если не все поля переданы
    const book = library.books.find((b) => b.id === id); //здесь м.б. разные типы

    if (book) {
        // надо менять только те поля, которые заполнены
        book.title = title;
        book.authors = authors;
        book.description = description;
        book.isbn = isbn;
        book.coverUrl = coverUrl;
        book.fileUrl = fileUrl;
        res.status(200);
        res.json(book);
    } else {
        res.status(404);
        res.json('404 | Страница не найдена');
    }
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const idx = library.books.findIndex((b) => b.id === id);
    if (idx !== -1) {
        library.books.splice(idx, 1);
        res.status(204).end();
        //res.json(true);
    } else {
        res.status(404);
        res.json('404 | Страница не найдена');
    }
});

module.exports = router;