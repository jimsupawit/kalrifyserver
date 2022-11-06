const express = require('express');
const router = express.Router();

const addDiary = require('../controllers/addDiary')
const checkAuth = require('../middlewares/auth')

router.post('/addUserdiary', addDiary.addUserdiary)

module.exports = router