const express = require('express');
const router = express.Router();

class User {
    constructor(email = "", password = "") {
        this.email = email;
        this.password = password;
    }
}

const library = {
    users: [
        new User("F7g7F@example.com", "123456"),
        new User("d1lXt@example.com", "123456"),
    ],
};

router.post('/register', (req, res) => {
    // добавляем в список
    library.users.push(new User(req.body.email, req.body.password));
    res.render('index');
});

router.post('/login', (req, res) => {
    res.render('index');
});

router.post('/logout', (req, res) => {
    res.render('index');
});

module.exports = router;