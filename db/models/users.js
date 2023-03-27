const mongoose = require("mongoose")
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add the name"]
    },
    email: {
        type: String,
        required: [true, "please add the email"]
    },
    password: {
        type: String,
        required: [true, "please add the password"]
    },
    dob: {
        type: String,
        required: [true, "please add the dob"]
    },
    salery: {
        type: String,
        required: [true, "please add the salery"]
    }
},
    { timestamps: true }
)



module.exports= mongoose.model("myuser",userschema)
