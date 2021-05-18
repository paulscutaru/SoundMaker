const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const crypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    const user_exists = await Users.findOne({ where: { username: username } });

    if (user_exists)
        res.json({ error: 'Username already exists!' })
    else {
        crypt.hash(password, 9).then((hash) => {
            Users.create({
                username: username,
                password: hash,
            });
            res.json('Success')
        })
    }

});

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await Users.findOne({ where: { username: username } })

    if (!user)
        res.json({ error: 'User does not exist!' })
    else {
        crypt.compare(password, user.password).then((match) => {
            if (!match)
                res.json({ error: 'Wrong password!' })
            else {
                // Login success
                const token = sign({ username: user.username, id: user.id }, '9305029939')
                res.json({ token: token, username: user.username, id: user.id })
            }
        });
    }
});

router.get('/logged', validateToken, (req, res) => {
    res.json(req.user)
});

module.exports = router;