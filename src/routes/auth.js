const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const { v4: uuidv4 } = require('uuid');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Требуется указать email и пароль.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Некорректный формат email.' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Некорректный формат пароля. Требования: минимум 8 символов, хотя бы одна буква в верхнем регистре, ' +
            'одна в нижнем регистре, одна цифра и один специальный символ.'
        });
    }
    
    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует.' });
        }

        const newUser = new User({email, password});
        await newUser.save();
        res.status(201).json({id: newUser._id, token: uuidv4()});
    } catch(err) {
        res.status(500).json({ message: 'Ошибка сервера', error: err.message });
    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Требуется указать email и пароль.' });
    }

    try {
        const existingUser = await User.findByEmail(email);
        if (!existingUser) {
            return res.status(401).json({ message: 'Пользователь с таким email не существует.' });
        }

        const isPasswordValid = await existingUser.verifyPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Неверный пароль.' });
        }

        res.status(200).json({id: existingUser._id, token: uuidv4()});
    } catch(err) {
        res.status(500).json({ message: 'Ошибка сервера', error: err.message });
    }
});

router.post('/logout', (req, res) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Отсутствует заголовок Authorization.' });
    }

    const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/);
    if (!tokenMatch) {
        return res.status(400).json({ message: 'Некорректный формат заголовка Authorization.' });
    }

    const token = tokenMatch[1];

    res.status(204).send();
});

module.exports = router;