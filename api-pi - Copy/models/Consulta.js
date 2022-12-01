const mongoose = require('mongoose')

const Consulta = mongoose.model('Consulta', {
    symptons: {
        type: Array,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    } 
})

module.exports = Consulta