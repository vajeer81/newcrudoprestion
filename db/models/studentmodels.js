const mongoose = require('mongoose')
const studentschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add the name ']
    },
    dob: {
        type: String,
        required: [true, 'please add the class ']
    },
    email: {
        type: String,
        required: [true, 'please add the email '],
    },
    school: {
        type: String,
        required: [true, 'please add the school ']
    },
}, {
    timestamps: true
})


module.exports= mongoose.model("mystudent",studentschema)