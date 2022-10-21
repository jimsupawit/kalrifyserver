const express = require('express');
const router = express.Router();

const dish = require('../controllers/dish')

router.get('/getDish', dish.getDish)

module.exports = router