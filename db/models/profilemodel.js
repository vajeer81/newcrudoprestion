const mongoose = require("mongoose")
const profileschema = new mongoose.Schema({
    img: {
        type: String,
        required: [true, "please add the img"]

    },
    fistname: {
        type: String,
        required: [true, "please add the fistname"]

    },
    lastname: {
        type: String,
        required: [true, "please add the lastname"]

    },
    email: {
        type: String,
        required: [true, "please add the email"]

    },
    gender: {
        type: String,
        required: [true, "please add the gender"]

    },
})

module.exports = mongoose.model("profiles", profileschema)