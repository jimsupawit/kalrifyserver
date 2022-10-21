const express = require('express');
const router = express.Router();

const user = require('../controllers/user')
const checkAuth = require('../middlewares/auth')

// router.get('/', checkAuth, user.getProfile);
// router.get('/qr', checkAuth, user.getQR);
// router.get('/pin', checkAuth, user.getPin);
// router.post('/pin', checkAuth, user.createPin);
// router.post('/pin/update', checkAuth, user.updatePin);
// router.post('/password/update', checkAuth, user.updatePassword);

router.get('/getDish', user.getDish)

module.exports = router