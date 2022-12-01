require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const port = 8000 
const app = express()

const Worker = require('./models/Worker')

const userLogin = require("./controllers/userLogin")
const userRegister = require("./controllers/userRegister")
const workerLogin = require("./controllers/workerLogin")
const workerRegister = require("./controllers/workerRegister")
const createConsulta = require("./controllers/createConsulta")
const readConsulta = require("./controllers/readConsulta")
const deleteConsulta = require("./controllers/deleteConsulta")
const checkSession = require("./controllers/checkSession")
const checkUser = require("./controllers/checkUser")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


async function checkToken(req, res, next){
    const token = req.headers['x-acess-token']
    if(!token){
        return res.status(401).send({ "msg":'Token inexistente'})
    }
    try{
        const secret = process.env.SECRET
        jwt.verify(token, secret, (err, decoded) => {
            if(err) return res.status(401).send({ "msg":'Acesso não autorizado', err})
            req.id = decoded.id 
            next()
        })
    }catch{
        return res.status(401).send({ "msg":'Erro ao acessar'})
    }
}

async function isWorker(req, res, next){
    const userID = req.id
    const worker = await Worker.findOne({ _id: userID})
    if(!worker){
        res.send({"msg":"Funcionário não cadastrado"})
    }
    try{    
        next()
    }catch(err){
        return res.status(401).send({ "msg":'Erro ao acessar'})
        console.log(err)
    }
}

app.get('/session', checkToken, checkSession)

app.post('/user/signup', userRegister)
app.post("/user/login", userLogin)


app.post('/worker/signup', workerRegister) 
app.post('/worker/login', workerLogin) 

app.post("/consulta", checkToken, createConsulta)
app.get("/consulta", checkToken, isWorker, readConsulta)

app.get("/checkUser/:id", checkUser)

app.delete("/consulta/:id", checkToken, isWorker, deleteConsulta)

const DBuser = process.env.DB_USER
const DBpassword = process.env.DB_PASSWORD
mongoose.connect(`mongodb+srv://matheusrizzati:vZO6Rz51zTROKkyh@developmentdatabase.kgc7dlx.mongodb.net/?retryWrites=true&w=majority`)
.then(
    () => {
    console.log('conected to database')
    app.listen(port, () =>{ console.log(`Server is running in port ${port}`)})
    }
)
.catch(err => console.log(err))