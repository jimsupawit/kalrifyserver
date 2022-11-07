require('dotenv').config() 
const { DATETIME, NULL } = require('mysql/lib/protocol/constants/types');
const knex = require("../services/db");


async function getDiary(req, res, next){
    const { id } = req.user;
    try{
        // get data
        const diary = await knex('user_diary').where({ uid:id })
        return res.status(200).json({ status: 'SUCCESS', diary })
        
    } catch(err) {
        return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
    }
}


async function addDiary(req, res, next) {
    const { id } = req.user;
    // const  id  = "1";
    console.log(req.body)
    const { 
        date_Now,
        total_Cal, 
        FoodNameENG,                                      
        FoodNameTH, 
        Fat, 
        Carb, 
        Protein, 
        Sodium, 
        Portion
    } = req.body;
    
    
    const check = await knex('user_diary').select('date').where({ uid:id }).where('date', '>=', date_Now+"T00:00:00Z").where('date','<=', date_Now+'T23:59:59Z')
    // print(check);
    const dish_List = {body: [{
        "Calories":parseFloat(total_Cal),
        "FoodNameENG":FoodNameENG,                                      
        "FoodNameTH":FoodNameTH, 
        "Fat":parseFloat(Fat), 
        "Carb":parseFloat(Carb), 
        "Protein":parseFloat(Protein), 
        "Sodium":parseFloat(Sodium), 
        "Portion":parseFloat(Portion)
    }]}

    console.log(dish_List)
    try {
        if(check[0]==null){
            console.log('null')
        const diary = await knex.insert({ uid:id, totalCal:total_Cal, dishList:dish_List }).into('user_diary')
    
        return res.status(200).json({ status: 'SUCCESS', total_Cal, dish_List})
        }else{
                const oldTotal = await knex('user_diary').select('totalCal').where({ uid:id }).where('date', '>=', date_Now+"T00:00:00Z").where('date','<=', date_Now+'T23:59:59Z')
                const dbList = await knex('user_diary').select('dishList').where({ uid:id }).where('date', '>=', date_Now+"T00:00:00Z").where('date','<=', date_Now+'T23:59:59Z')
                const diaryID = await knex('user_diary').select('id').where({ uid:id }).where('date', '>=', date_Now+"T00:00:00Z").where('date','<=', date_Now+'T23:59:59Z')
                const newTotal = oldTotal[0].totalCal+total_Cal;
                console.log(dbList[0].dishList)
                const temp = JSON.parse(dbList[0].dishList)
                temp["body"].push(dish_List["body"][0])
                console.log(temp["body"])

                newList = JSON.stringify(temp)
                console.log(newList)
                const diary = await knex('user_diary').where({ id:diaryID[0].id }).update({ totalCal:newTotal, dishList:newList })
                
    
    
                return res.status(200).json({ status: 'SUCCESS', newTotal, newList})
        }

    } catch(err) {
    console.log('SOMETHING_WENT_WRONG 😢', err);
    return res.status(400).json({ status: 'ERROR'})
    }
}


module.exports = {
    getDiary,
    addDiary
}