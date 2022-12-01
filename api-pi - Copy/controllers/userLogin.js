const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

async function userLogin(req, res){
    const {cpf, password} = req.body

    if(!cpf){
        return res.status(400).send({"msg":"Insira seu CPF"})
    }
    if(!password){
        return res.status(400).send({"msg":"Insira sua senha"})
    }
    const user = await User.findOne({cpf: cpf})
    if(!user){
        return res.status(400).send({"msg":"Usuário inexistente"})
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword){
        return res.status(400).send({"msg":"Senha incorreta"})
    }

    try{
        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret
        )

        res.status(200).send({ "msg":"Login efetuado", token})
    } catch(err){
        console.log(err)
    }
}

module.exports = userLogin