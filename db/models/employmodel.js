const mongoose = require('mongoose')
const employschema = new mongoose.Schema({
    employid: {
        type: String,
        required: [true, "please add id"],
        uniqui: true,


    },
    employemail: {
        type: String,
        required: [true, "please add email"],
        uniqui: true,

    },
    employname: {
        type: String,
        required: [true, "please add name"]

    },
    employselery: {
        type: String,
        required: [true, "please add selery"]

    },
})


module.exports = mongoose.model("Emp", employschema)