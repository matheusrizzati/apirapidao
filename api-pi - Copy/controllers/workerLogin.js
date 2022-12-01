const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Worker = require('../models/Worker')

async function workerLogin(req, res){
    const {cpf, password} = req.body

    if(!cpf){
        return res.status(400).send({"msg":"Insira seu CPF"})
    }
    if(!password){
        return res.status(400).send({"msg":"Insira sua senha"})
    }
    const worker = await Worker.findOne({cpf: cpf})
    if(!worker){
        return res.status(400).send({"msg":"Funcionário inexistente"})
    }
    const checkPassword = await bcrypt.compare(password, worker.password)
    if(!checkPassword){
        return res.status(400).send({"msg":"Senha incorreta"})
    }

    try{
        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: worker._id,
            },
            secret
        )

        res.status(200).send({ "msg":"Login efetuado", token})
    } catch(err){
        console.log(err)
    }
}

module.exports = workerLogin