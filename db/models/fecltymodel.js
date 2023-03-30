const mongoose = require("mongoose")
const fecltyschema = new mongoose.Schema({
    TeacherName:{
        type:String,
        required:[true,"please add the Name"]
    },
    TeacherEmail:{
        type:String,
        required:[true,"please add the Email"],
        unique:[true,"allredy Email exit"]
    },

    TeacherPost:{
        type:String,
        required:[true,"please add the Post"]
    },

    TeacherQualification:{
        type:String,
        required:[true,"please add the Qualification"]
    },

    TeacherNumber:{
        type:String,
        required:[true,"please add the Number"]
    },
})



module.exports = mongoose.model("teacher",fecltyschema)