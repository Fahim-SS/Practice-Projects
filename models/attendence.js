const mongoose = require('mongoose')

const attendenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    presentinclass: {
        type: String,
        required: true


    },
    presentdate: {
        type: Date,
        required: true,
        default: Date.now
    },
    

})

module.exports = mongoose.model('Attendence', attendenceSchema) 