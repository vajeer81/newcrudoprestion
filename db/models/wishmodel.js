const mongoose = require("mongoose")
const Wishingschema = new mongoose.Schema({
    Likeimage:{
        type:String,
        required:[true,"please add Likeimage "]
    },
    title:{
        type:String,
        required:[true,"please add title "]
    },
    dis:{
        type:String,
        required:[true,"please add the dis"]

    },
    image:{
        type:String,
        required:[true,"please add the image"]
    },

})


module.exports= mongoose.model("wishing",Wishingschema)