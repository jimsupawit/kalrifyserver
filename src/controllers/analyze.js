require('dotenv').config() 
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const knex = require("../services/db");

async function getAnalyze(req, res, next){
    try{
        // get data
        const analyze = await knex('Food Nutrition Fact').where("FoodNameENG", req.headers["food"]).select('FoodID', 'FoodNameENG', 'FoodNameTH', 'Calories', 'Fat', 'Carb', 'Protein', 'Sodium', 'Portion','Image' )
        
        return res.status(200).json({ status: 'SUCCESS', analyze })
    } catch(err) {
        console.log('SOMETHING_WENT_HORRIBLYWRONG', err);
        return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
    }
}

module.exports = {
    getAnalyze
}