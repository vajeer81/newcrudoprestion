const mongoose = require("mongoose")
const projectschema = new mongoose.Schema({
    title: {
        type: String,
      required: [true, 'Please add a title']
        
    },
    dis: {
        type: String,
      required: [true, 'Please add a dis']

    },
    price: {
        type: Number,
      required: [true, 'Please add a price']

    },
    reting: {
        type: String,
        required: [true, 'Please add a reting']

    },
    color: {
        type: String,
        required: [true, 'Please add a color']

    },
    img: {
        type: String,
      required: [true, 'Please add a img']


    },
    size: {
        type: String,
        required: [true, 'Please add a size']

    }
})


module.exports = mongoose.model("prodects", projectschema)







