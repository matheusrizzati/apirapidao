const Consulta = require('../models/Consulta')

async function deleteConsulta(req, res){
    const consultaID = req.params.id
    try{
        await Consulta.deleteOne({ _id: consultaID})
        res.send({"msg":"Consulta deletada"})
    }catch(err){
        res.send({"msg":"Um erro ocorreu!"})
        console.log(err)
    }
}

module.exports = deleteConsulta