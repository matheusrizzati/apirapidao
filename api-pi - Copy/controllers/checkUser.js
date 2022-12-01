const User = require('../models/User')

async function checkUser(req, res){
    const userID = req.params.id
    console.log(userID)
    try{
        const user = await User.findOne({_id: userID})
        res.send(user)
    }catch(err){
        res.send({"msg":"Um erro ocorreu!"})
        console.log(err)
    }
}

module.exports = checkUser