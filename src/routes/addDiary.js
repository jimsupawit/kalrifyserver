const express = require('express');
const router = express.Router();

const adddiary = require('../controllers/adddiary')
const checkAuth = require('../middlewares/auth')

router.post('/addDiary', adddiary.addDiary)

module.exports = router