const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const crypt = require('bcrypt')

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

    if(!user)
        res.json({error:'User does not exist!'})

    crypt.compare(password,user.password).then((match) =>{
        if(!match)
            res.json({error:'Wrong password!'})
        res.json('Login successful!')
    });
});

module.exports = router;