const express = require('express');
const router = express.Router();

const diary = require('../controllers/diary')

router.get('/getDiary', diary.getDiary)

module.exports = router