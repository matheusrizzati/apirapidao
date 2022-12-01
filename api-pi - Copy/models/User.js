const mongoose = require('mongoose')

const User = mongoose.model('User', {
    personName: String,
    cpf: String,
    birthDate: Date,
    phone: String,
    password: String,
    createdAt: Date,
})

module.exports = User