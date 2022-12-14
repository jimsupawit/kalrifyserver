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

async function getTotalcal(req, res, next){
    const { id } = req.user;
    // const  id  = "1";
    date_Now = req.headers["date"];

    const check = await knex('user_diary').select('date').where({ uid:id }).where('date', '>=', date_Now+"T00:00:00Z").where('date','<=', date_Now+'T23:59:59Z')

    if(check[0]==null){
        console.log('null')
    try{
        const diary = [{"totalCal": 0}]
    
        return res.status(200).json({ status: 'SUCCESS', diary})
    } catch(err) {
        return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
    }
    }else{
        try{
            // get data
            const diary = await knex('user_diary').select('totalCal').where({ uid:id }).where('date', '>=', date_Now+"T00:00:00Z").where('date','<=', date_Now+'T23:59:59Z')
            return res.status(200).json({ status: 'SUCCESS', diary })
            
        } catch(err) {
            return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
        }
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
        Portion,
        meal
    } = req.body;
    const date_Time = date_Now+ " 12:00:00";
    
    
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
        "Portion":parseFloat(Portion),
        "Meal": meal,
    }]}

    console.log(dish_List)
    try {
        if(check[0]==null){
            console.log('null')
        const diary = await knex.insert({ uid:id,date:date_Time, totalCal:total_Cal, dishList:dish_List }).into('user_diary')
    
        return res.status(200).json({ status: 'SUCCESS', total_Cal, dish_List})
        }else{
                const oldTotal = await knex('user_diary').select('totalCal').where({ uid:id }).where('date', '>=', date_Now+"T00:00:00Z").where('date','<=', date_Now+'T23:59:59Z')
                const dbList = await knex('user_diary').select('dishList').where({ uid:id }).where('date', '>=', date_Now+"T00:00:00Z").where('date','<=', date_Now+'T23:59:59Z')
                const diaryID = await knex('user_diary').select('id').where({ uid:id }).where('date', '>=', date_Now+"T00:00:00Z").where('date','<=', date_Now+'T23:59:59Z')
                const newTotal = oldTotal[0].totalCal+parseFloat(total_Cal);
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
    console.log('SOMETHING_WENT_WRONG ????', err);
    return res.status(400).json({ status: 'ERROR'})
    }
}

async function delDiary(req, res, next){
    const { id } = req.user;
    // const  id  = "1";
    const { 
        dishID,
        dishIndex,
        cal
    } = req.body;
    const dishListData = await knex('user_diary').select('dishList').where({ id:dishID })
    const calData = await knex('user_diary').select('totalCal').where({ id:dishID })
    const newCal = calData[0].totalCal-parseInt(cal);
    console.log(dishListData[0].dishList)
    const temp = JSON.parse(dishListData[0].dishList)
    console.log(temp["body"])
    console.log(dishIndex)
    temp["body"].splice(parseInt(dishIndex),1);
    var newList = temp["body"];
    newList = {"body": newList}
    newListData = JSON.stringify(newList)
    console.log(newListData)
    if(newCal!=0){
    try{

    const diary = await knex('user_diary').where({ id:dishID }).update({ totalCal:newCal, dishList:newListData })

    return res.status(200).json({ status: 'SUCCESS', newList, temp})
    } catch(err) {
        return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
    }
    }else{
    try{
        const diary = await knex('user_diary').where({ id:dishID }).del()

        return res.status(200).json({ status: 'SUCCESS', newList, temp})
        } catch(err) {
            return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
        } 
    }



}

async function findDishlist(req, res, next){
    const { id } = req.user;
    // const  id  = "1";
    date_Now = req.headers["date"];

    try{
        const dishList = await knex('user_diary').select('dishList').where({ uid:id }).where('date', '>=', date_Now+"T00:00:00Z").where('date','<=', date_Now+'T23:59:59Z')

        return res.status(200).json({ status: 'SUCCESS', dishList})
    } catch(err) {
        return res.status(400).json({ status: 'SOMETHING_WENT_HORRIBLYWRONG' })
    } 

}


module.exports = {
    getDiary,
    addDiary,
    getTotalcal,
    delDiary,
    findDishlist
}