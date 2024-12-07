const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    title: {type: String, required: true},
    authors: {type: [String], required: true},
    description: {type: String, required: true},
    isbn: {type: String, required: false, default: null},
    coverUrl: {type: String, required: false, default: null},
    fileUrl: {type: String, required: false, default: null},
});

// Добавляем виртуальное поле `id`, которое ссылается на `_id`
bookSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Удаляем лишние поля
bookSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret._id;
      return ret;
    },
  });

module.exports = model('Book', bookSchema);