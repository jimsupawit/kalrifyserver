const express = require('express');
const router = express.Router();

const image = require('../controllers/image')

router.get('/getImage', image.getImage)

module.exports = router