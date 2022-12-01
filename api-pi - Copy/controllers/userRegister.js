const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/User')

async function userRegister(req, res){
    const {personName, cpf, birthDate, phone, password, confirmPassword} = req.body

    //validacoes dos campos
    if(!personName){
        return res.status(300).send({"msg":"Insira seu nome"})
    }
    if(!cpf){
        return res.status(300).send({"msg":"Insira seu CPF"})
    }
    if(!birthDate){
        return res.status(300).send({"msg":"Insira sua data de nascimento"})
    }
    if(!phone){
        return res.status(300).send({"msg":"Insira seu numero de telefone"})
    }
    if(!password){
        return res.status(300).send({"msg":"Digite uma senha"})
    }
    if(!confirmPassword){
        return res.status(300).send({"msg":"Confirme sua senha"})
    }

    const userExist = await User.findOne({ cpf: cpf})
    if(userExist){
       return res.status(400).send({"msg":"CPF já cadastrado"})
    }
    if(password !== confirmPassword){
        return res.status(400).send({"msg":"Senha e confirmação não estão iguais"})
    } 
    
    // const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
        personName,
        cpf,
        birthDate,
        phone,
        password: await bcrypt.hash(password, 10),
        createdAt: Date.now()})

    try{
        await user.save()
        res.send({"msg":"Registrado com sucesso"})
    }catch(err){
        console.log(err)
    }
}

module.exports = userRegister