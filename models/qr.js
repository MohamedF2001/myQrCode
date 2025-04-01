var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var qrSchema = new Schema({
    qrCode: {
        type: String,
        require: true,
    },
    evenement: {
        type: String,
        require: true,
    },
    numTicket: {
        type: String,
        require: true
    },
    nom: {
        type: String,
        require: true
    },
    prenom: {
        type: String,
        require: true
    },
    telephone: {
        type: String,
        require: true
    },
    monstatut: {
        type: String,
        require: true
    },
    permis: {
        type: Boolean,
        require: true
    }
})

module.exports = mongoose.model('QR', qrSchema)
