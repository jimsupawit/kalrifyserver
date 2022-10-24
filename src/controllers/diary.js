require('dotenv').config() 
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const knex = require("../services/db");

async function getDiary(req, res, next){
    try{
        // get data
        const diary = await knex('User_Diary').select()
        
        return res.status(200).json({ status: 'SUCCESS', diary })
    } catch(err) {
        console.log('SOMETHING_WENT_HORRIBLYWRONG', err);
        return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
    }
}

module.exports = {
    getDiary
}