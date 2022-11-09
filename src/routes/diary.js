const express = require('express');
const router = express.Router();

const diary = require('../controllers/diary')
const checkAuth = require('../middlewares/auth')

router.get('/getDiary',checkAuth, diary.getDiary)
router.post('/addDiary',checkAuth, diary.addDiary)
router.post('/getTotalcal',checkAuth, diary.getTotalcal)

module.exports = router