const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Worker = require('../models/Worker')

async function workerRegister(req, res){
    const {personName, cpf, password, confirmPassword} = req.body

    //validacoes dos campos
    if(!personName){
        return res.status(300).send({"msg":"Insira seu nome"})
    }
    if(!cpf){
        return res.status(300).send({"msg":"Insira seu CPF"})
    }
    if(!password){
        return res.status(300).send({"msg":"Digite uma senha"})
    }
    if(!confirmPassword){
        return res.status(300).send({"msg":"Confirme sua senha"})
    }

    const userExist = await Worker.findOne({ cpf: cpf})
    if(userExist){
       return res.status(400).send({"msg":"CPF já cadastrado"})
    }
    if(password !== confirmPassword){
        return res.status(400).send({"msg":"Senha e confirmação não estão iguais"})
    } 

  const worker = new Worker({
        personName,
        cpf,
        password: await bcrypt.hash(password, 10),
        createdAt: Date.now()})

    try{
        await worker.save()
        res.send({"msg":"Registrado com sucesso"})
    }catch(err){
        console.log(err)
    }
}

module.exports = workerRegister