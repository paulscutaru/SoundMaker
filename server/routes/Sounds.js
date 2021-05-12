const express = require('express');
const router = express.Router();
const { Sounds } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post('/', validateToken, async (req, res) => {
    const sound = req.body;
    //const username = req.user.username;
    //sound.username = username;
    await Sounds.create(sound);
    res.json(sound);
});

module.exports = router;