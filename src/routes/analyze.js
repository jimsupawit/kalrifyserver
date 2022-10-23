const express = require('express');
const router = express.Router();

const analyze = require('../controllers/analyze')

router.get('/getAnalyze', analyze.getAnalyze)

module.exports = router