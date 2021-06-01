const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const crypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require("../middlewares/AuthMiddleware");
const { validateAdmin } = require("../middlewares/AdminMiddleware");

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

router.get('/getUsers', validateAdmin, async (req, res) => {
    const users = await Users.findAll()
    res.json(users)
});

router.delete("/delete/:userId", validateAdmin, async (req, res) => {
    const userId = req.params.userId;
  
    await Users.destroy({
      where: {
        id: userId,
      },
    });
  
    res.json("Deleted successfully");
  });

module.exports = router;