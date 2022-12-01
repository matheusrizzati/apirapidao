const Consulta = require('../models/Consulta')

async function readConsulta(req, res){
    try{
        const consult = await Consulta.find()
        res.send(consult)    
    }catch(err){
        res.send({"msg":"Um erro ocorreu!"})
        console.log(err)
    }
}

module.exports = readConsulta