const express = require('express');
const router = express.Router();

const analyze = require('../controllers/image')

router.get('/getImage', image.getImage)

module.exports = router