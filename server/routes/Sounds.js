const express = require('express');
const router = express.Router();
const { Sounds } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post('/save',validateToken, async (req, res) => {
    const sound = req.body
    sound.name = req.body.name
    sound.username = req.user.username
    sound.UserId = req.user.id
    await Sounds.create(sound)
    res.json(sound)
});

router.get('/get', validateToken, async (req, res) => {
    const sounds = await Sounds.findAll({ where: { UserId: req.user.id } });
    res.json(sounds);
});

router.delete("/:soundId", validateToken, async (req, res) => {
    const soundId = req.params.soundId;
  
    await Sounds.destroy({
      where: {
        id: soundId,
      },
    });
  
    res.json("Deleted successfully");
  });

module.exports = router;