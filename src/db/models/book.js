const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    title: {type: String, required: true},
    authors: {type: [String], required: true},
    description: {type: String, required: true},
    isbn: {type: String, required: false, default: null},
    coverUrl: {type: String, required: false, default: null},
    fileUrl: {type: String, required: false, default: null},
});

module.exports = model('Book', bookSchema);