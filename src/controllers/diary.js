require('dotenv').config() 
const knex = require("../services/db");


async function getDiary(req, res, next){
    const { id } = req.user;
    try{
        // get data
        const diary = await knex('UserDiary').select().where({ uid:id })
        return res.status(200).json({ status: 'SUCCESS', diary })
        
    } catch(err) {
        return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
    }
}


async function addDiary(req, res, next) {
    // const { id } = req.user;
    const { id } = 1;
    const { date, total, dish } = req.body;
    // foodNameENG, foodNameTH, Calories, Fat, Carb, Protein, Sodium, Portion
    // {"foodNameENG": foodNameENG, "foodNameTH":foodNameTH, "Calories":Calories, "Fat":Fat, "Carb":Carb, "Protein":Protein, "Sodium":Sodium, "Portion":Portion}

    // const check = await knex('UserDiary').select(coalesce(sum(date),0)).where({ uid:id, date:date })
    // print(check);
    const dishList = {body: [dish]}
    try {
        // if(check=0){
    
                const diary = await knex('UserDiary').insert({ id, date, total, dishList })
    
                // const token = jwt.sign({ id: id[0] }, process.env.TOKEN_KEY);
    
                return res.status(200).json({ status: 'SUCCESS'})
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