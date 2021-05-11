const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const crypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    crypt.hash(password, 9).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json('Success')
    }).catch(res.json('Fail'));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await Users.findOne({ where: { username: username } })

    if (!user)
        res.json({ error: 'User does not exist!' })

    crypt.compare(password, user.password).then((match) => {
        if (!match)
            res.json({ error: 'Wrong password!' })

        // Login success
        const token = sign({ username: user.username, id: user.id }, '9305029939')
        res.json(token)
    });


});

module.exports = router;