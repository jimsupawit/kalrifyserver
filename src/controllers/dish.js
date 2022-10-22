require('dotenv').config() 
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const knex = require("../services/db");

async function getDish(req, res, next){
    try{
        // get data
        const dish = await knex('Food Nutrition Fact').select('FoodID', 'FoodNameENG', 'FoodNameTH', 'Calories', 'Fat', 'Carb', 'Protein', 'Sodium' )
        
        return res.status(200).json({ status: 'SUCCESS', dish })
    } catch(err) {
        console.log('SOMETHING_WENT_HORRIBLYWRONG', err);
        return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
    }
}

module.exports = {
    getDish
}