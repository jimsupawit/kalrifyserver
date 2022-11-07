require('dotenv').config() 
const knex = require("../services/db");


async function getDiary(req, res, next){
    const { id } = req.user;
    try{
        // get data
        const diary = await knex('user_diary').select().where({ uid:id })
        return res.status(200).json({ status: 'SUCCESS', diary })
        
    } catch(err) {
        return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
    }
}


async function addDiary(req, res, next) {
    const { id } = req.user;
    // const  uid  = "1";
    console.log(req.body)
    const { total_Cal, dish_List } = req.body;
    
    // const date = req.body["date"];
    // const total = req.body.total;
    // const dish = req.body.dish;
    // foodNameENG, foodNameTH, Calories, Fat, Carb, Protein, Sodium, Portion
    // {"foodNameENG": foodNameENG, "foodNameTH":foodNameTH, "Calories":Calories, "Fat":Fat, "Carb":Carb, "Protein":Protein, "Sodium":Sodium, "Portion":Portion}

    // const check = await knex('UserDiary').select(coalesce(sum(date),0)).where({ uid:id, date:date })
    // print(check);
    // const dishL = {body: [dishL]}
    try {
        // if(check=0){
    
        const diary = await knex.insert({ uid:id, totalCal:total_Cal, dishList:dish_List }).into('user_diary')
        // const diary = knex('user_diary').insert({ uid, totalCal, dishList })
                // const token = jwt.sign({ id: id[0] }, process.env.TOKEN_KEY);
    
        return res.status(200).json({ status: 'SUCCESS', total_Cal, dish_List})
        // }else{
        //         const oldTotal = await knex('UserDiary').select(total).where({ uid:id, date:date })
        //         const newList = await knex('UserDiary').select(dishList).where({ uid:id, date:date })
        //         const newTotal = oldTotal+total;
        //         newList["body"].add(dishList["body"][0]);


        //         const diary = await knex('UserDiary').where({uid:id, date:date}).update({ newTotal, newList })
    
        //         // const token = jwt.sign({ id: id[0] }, process.env.TOKEN_KEY);
    
        //         return res.status(200).json({ status: 'SUCCESS'})
        // }

    } catch(err) {
    console.log('SOMETHING_WENT_WRONG 😢', err);
    return res.status(400).json({ status: 'ERROR'})
    }
}


module.exports = {
    getDiary,
    addDiary
}