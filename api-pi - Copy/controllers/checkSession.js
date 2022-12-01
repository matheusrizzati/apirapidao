const User = require('../models/User')

async function checkSession(){

    const id = req.id

    const user = await User.findById(id, '-password')
    
    if(!user){
        return res.status(404).send({"msg":"not registered email"})
    }

    try{
        res.status(200).send({"msg":"valid session", user})
    }catch(err){
        res.status(400).send({"msg":"invalid session"})
    }
}

module.exports = checkSession