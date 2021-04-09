const express = require('express');
const router = express.Router();
const {Users} = require('../models/Users');

router.get('/', (req, res) => {
    res.json('Hello login')
});

router.post('/');

module.exports = router;