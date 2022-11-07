var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const knex = require("../services/db");

async function register(req, res, next) {
    const { email, password, username, weight, height } = req.body;

    if (!(email && password && username && weight && height)) {
        console.log('FIELDS_ARE_REQUIRED'); return res.status(400).json({ status: 'FIELDS_ARE_REQUIRED' });
    }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    try {
        const id = await knex('Users').insert({ username, email, password: hash, weight, height })

        const token = jwt.sign({ id: id[0] }, process.env.TOKEN_KEY);

        return res.status(200).json({ status: 'SUCCESS', token })
    } catch(err) {
        console.log('SOMETHING_WENT_WRONG', err);
        return res.status(400).json({ status: 'ERROR'})
    }
}

async function login(req, res, next) {
    console.log('[POST] /auth/login');
    const { username, password } = req.body;

    if (!(username && password)) {
        console.log('FIELDS_ARE_REQUIRED'); return res.status(400).json({ status: 'FIELDS_ARE_REQUIRED' });
    }

    try {
        const user = await knex.first('id', 'password').from('Users').where({ username })
        if (!user) return res.status(404).json({ status: 'USER_NOT_FOUND' })

        const result = await bcrypt.compare(password, user.password)
        if (result) {
            const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY);
            return res.status(200).json({ status: 'SUCCESS', token })
        } else {
            return res.status(400).json({ status: 'PASSWORD_NOT_MATCHED' })
        }
    } catch(err) {
        console.log('SOMETHING_WENT_WRONG', err);
        return res.status(400).json({ status: 'SOMETHING_WENT_WRONG' })
    }
}


module.exports = {
    register,
    login,
}