class Book {
    constructor({ id, title, authors, description, isbn, coverUrl, fileUrl }) {
        this.id = id;
        this.title = title;
        this.authors = authors;
        this.description = description;
        this.isbn = isbn || null;
        this.coverUrl = coverUrl || null;
        this.fileUrl = fileUrl || null;
    }
}

const toDTO = (book) => {
    return new Book({
        id: book._id.toString(),
        title: book.title,
        authors: book.authors,
        description: book.description,
        isbn: book.isbn,
        coverUrl: book.coverUrl,
        fileUrl: book.fileUrl,
    });
};

const toDB = (bookDTO) => {
    return {
        title: bookDTO.title,
        authors: bookDTO.authors,
        description: bookDTO.description,
        isbn: bookDTO.isbn,
        coverUrl: bookDTO.coverUrl,
        fileUrl: bookDTO.fileUrl,
    };
};

module.exports = {
    Book,
    toDTO,
    toDB,
};