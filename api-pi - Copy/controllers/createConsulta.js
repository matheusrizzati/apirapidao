const Consulta = require('../models/Consulta')

async function createConsulta(req, res){
    const {symptons} = req.body
    const userID = req.id

    const consulta = new Consulta({
        symptons,
        user: userID,
        createdAt: Date.now()
    })

    try{
        await consulta.save()
        res.send({"msg":"Atendimento criado com sucesso"})
    }catch(err){
        res.send({"msg":"Um erro ocorreu!"})
        console.log(err)
    }
}

module.exports = createConsulta