const express = require("express")
const jwt = require("jsonwebtoken")
const Router = express.Router()
const product = require('../../db/models/productmodel');
const asyncHandler = require('express-async-handler');
Router.use(express.json())


Router.get("/", async (req, res) => {
    try {
        let data = await product.find({});
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }

})


Router.get("/find/:_id", async (req, res) => {
    try {
        let data = await product.findById(req.params._id)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)

    }

})



Router.post("/", asyncHandler(async (req, res) => {
    try {

        const { title, dis, price, reting, img, color, size } = req.body
        if (!title || !dis || !price || !reting || !img || !color || !size) {
            res.status(400).json({ message: "Please add all Filed" })
        }

        let data = await product.create({
            title,
            dis,
            img,
            price,
            reting,
            color,
            size
        });
        if (!data) {
            res.status(404).json({ error: "data is not difine" })
        }
        console.log("====>", data);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)

    }

}))

Router.put("/:_id", asyncHandler(async (req, res) => {
    try {
        let findid = await product.findById(req.params._id);
        if (!findid) {
            res.status(400)
            send("user not found");
        }

        const updateusers = await user.findByIdAndUpdate(req.params._id, req.body, {
            new: true
        })
        console.log("=====>", updateusers);

        res.status(200).json({ message: `updatedata ${req.params._id}` })
    } catch (error) {
        res.status(404).json(error)

    }

}))
Router.delete("/:_id", asyncHandler(async (req, res) => {
    try {
        let findid = await product.findById(req.params._id);
        if (!findid) {
            res.status(400);
            res.send("user not found");
        }
        await findid.remove();


        res.status(200).json({ message: `delete data ${req.params._id}` });
    } catch (error) {
        res.status(404).json(error)

    }


}))

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: "20d" })
}



module.exports = Router