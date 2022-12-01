const mongoose = require('mongoose')

const Worker = mongoose.model('Worker', {
    personName: String,
    cpf: String,
    password: String,
    createdAt: Date,
})

module.exports = Worker