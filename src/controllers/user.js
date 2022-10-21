require('dotenv').config() 
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const knex = require("../services/db");

// // GET PIN
// async function getPin(req, res, next) {
//     console.log('[GET] /user/pin');
//     const { id } = req.user;

//     try {
//         const user = await knex.first('pin').from('users').where({ id })
//         if (!user.pin) return res.status(404).json({ status: 'PIN_NOT_CREATED' })

//         return res.status(200).json({ status: 'SUCCESS' })
//     } catch(err) {
//         console.log('SOMETHING_WENT_WRONG 😢', err);
//         return res.status(400).json({ status: 'SOMETHING_WENT_WRONG' })
//     }
// }

// // Create PIN
// async function createPin(req, res, next) {
//     console.log('[POST] /user/pin');
//     const { id } = req.user;
//     const { pin } = req.body;

//     if (!(pin)) {
//         console.log('FIELDS_ARE_REQUIRED 😢'); return res.status(400).json({ status: 'FIELDS_ARE_REQUIRED' });
//     }

//     var salt = bcrypt.genSaltSync(10);
//     var hash = bcrypt.hashSync(pin, salt);

    
//     try {
//         await knex('users').where({ id }).update({ pin: hash })

//         return res.status(200).json({ status: 'SUCCESS' })
//     } catch(err) {
//         console.log('SOMETHING_WENT_WRONG 😢', err);
//         return res.status(400).json({ status: 'SOMETHING_WENT_WRONG' })
//     }
// }

// // Update PIN
// async function updatePin(req, res, next) {
//     console.log('[POST] /user/pin/update');
//     const { id } = req.user;
//     const { old, pin } = req.body;

//     if (!(old && pin)) {
//         console.log('FIELDS_ARE_REQUIRED 😢'); return res.status(400).json({ status: 'FIELDS_ARE_REQUIRED' });
//     }

//     var salt = bcrypt.genSaltSync(10);
//     var hash = bcrypt.hashSync(pin, salt);

//     try {
//         const data = await knex.first('pin').from('users').where({ id })

//         const result = await bcrypt.compare(old, data.pin)
//         if (result) {
//             await knex('users').where({ id }).update({ pin: hash })
//             return res.status(200).json({ status: 'SUCCESS' })
//         } else {
//             return res.status(400).json({ status: 'PIN_NOT_MATCHED' })
//         }
//     } catch(err) {
//         console.log('SOMETHING_WENT_WRONG 😢', err);
//         return res.status(400).json({ status: 'SOMETHING_WENT_WRONG' })
//     }
// }

// // Update Password
// async function updatePassword(req, res, next) {
//     console.log('[POST] /user/password/update');
//     const { id } = req.user;
//     const { old, password } = req.body;

//     if (!(old && password)) {
//         console.log('FIELDS_ARE_REQUIRED 😢'); return res.status(400).json({ status: 'FIELDS_ARE_REQUIRED' });
//     }

//     var salt = bcrypt.genSaltSync(10);
//     var hash = bcrypt.hashSync(password, salt);

//     try {
//         const data = await knex.first('password').from('users').where({ id })

//         const result = await bcrypt.compare(old, data.password)
//         if (result) {
//             await knex('users').where({ id }).update({ password: hash })
//             return res.status(200).json({ status: 'SUCCESS' })
//         } else {
//             return res.status(400).json({ status: 'PASSWORD_NOT_MATCHED' })
//         }
//     } catch(err) {
//         console.log('SOMETHING_WENT_WRONG 😢', err);
//         return res.status(400).json({ status: 'SOMETHING_WENT_WRONG' })
//     }
// }

// // GET QR
// async function getQR(req, res, next) {
//     // console.log('[GET] /user/qr');
//     const { id } = req.user;

//     try {
//         const user = await knex.first('id', 'passport').from('users').where({ id })
//         if (!user) return res.status(404).json({ status: 'USER_NOT_FOUND' })
//         if (!user.passport) return res.status(404).json({ status: 'PASSPORT_NOT_FOUND' })
//         const timer = Number(process.env.JWT_QR_EXPIRES)
//         const token = jwt.sign(
//             { id }, process.env.TOKEN_KEY,
//             { expiresIn: timer }
//         );
//         return res.status(200).json({ status: 'SUCCESS', token, timer })
//     } catch(err) {
//         console.log('SOMETHING_WENT_WRONG 😢', err);
//         return res.status(400).json({ status: 'SOMETHING_WENT_WRONG' })
//     }
// }

// // GET PROFILE
// async function getProfile(req, res, next) {
//     // console.log('[GET] /user');
//     const { id } = req.user;

//     try {
//         const user = await knex.first('users.email', 'passports.passport_no', 'passports.name', 'passports.surname', 'check_in_at')
//                                 .from('users')
//                                 .join('passports', { 'passports.id': 'users.passport' })
//                                 .where({ 'users.id': id })
//         if (!user) return res.status(404).json({ status: 'USER_NOT_FOUND' })
//         if (!user.passport_no) return res.status(404).json({ status: 'PASSPORT_NOT_FOUND' })

//         return res.status(200).json({ status: 'SUCCESS', user })
//     } catch(err) {
//         console.log('SOMETHING_WENT_WRONG 😢', err);
//         return res.status(400).json({ status: 'SOMETHING_WENT_WRONG' })
//     }
// }

module.exports = {
    // getPin,
    // createPin,
    // updatePin,
    // updatePassword,
    // getQR,
    // getProfile,
}