require('dotenv').config() 
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const knex = require("../services/db");

async function getImage(req, res, next){
    try{
        // get data
        const image = await knex('Food Nutrition Fact').where("FoodNameENG", req.headers["food"]).select('Image',)
        
        return res.status(200).json({ status: 'SUCCESS', image })
    } catch(err) {
        console.log('SOMETHING_WENT_HORRIBLYWRONG', err);
        return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
    }
}

module.exports = {
    getImage
}