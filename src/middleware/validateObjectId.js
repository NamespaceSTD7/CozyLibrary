const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Middleware для проверки и конвертации id
function validateObjectId(req, res, next) {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Некорректный id книги.' });
    }
    req.params.id = new ObjectId(id);
    next();
}

module.exports = validateObjectId;