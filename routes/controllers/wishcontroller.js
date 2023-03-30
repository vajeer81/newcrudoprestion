const wishing = require("../../db/models/wishmodel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const Router = express.Router()
Router.use(express.json())



Router.get("/", async (req, res) => {

    try {
        const data = await wishing.find({})
        if (!data) {
            res.status(404).json("data is missing")
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }

})


Router.post("/", async (req, res) => {
    try {
        const { title, image, dis, Likeimage } = req.body
        if (!title || !image || !dis || !Likeimage) {
            res.status(400).json({ error: "missing the fild" })
        }
        const data = await wishing.create({
            title,
            dis,
            image,
            Likeimage
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
})

Router.delete("/:_id", async (req, res) => {
    try {
        const data = await wishing.findById(req.params._id)
        if (!data) {
            res.status(404).json({ error: "id is missing" })
        }
        const result = await data.deleteOne()
        res.status(200).json("data is delete")
    } catch (error) {
        res.status(404).json(error)
    }
})




module.exports = Router