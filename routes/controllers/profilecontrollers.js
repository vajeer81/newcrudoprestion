const express = require("express")
const jwt = require("jsonwebtoken")
const Router = express.Router()
Router.use(express.json())
const profile = require("../../db/models/profilemodel")

Router.get("/", async (req, res) => {
    try {
        const data = await profile.find({})
        res.status(202).json(data)
    } catch (error) {
        res.status(404).json({ error: error })
    }
})


Router.get("/me/:_id", async (req, res) => {
    try {
        const data = await profile.findById(req.params._id)
        res.status(202).json(data)
    } catch (error) {
        res.status(404).json({ error: error })
    }
})



Router.get("/me/:_id", async (req, res) => {
    try {
        const data = await profile.findById(req.params._id)
        if (!data) {
            res.status(404).json({ error: "data is missing" })
        }
        res.status(202).json(data)
    } catch (error) {
        res.status(404).json({ error: error })
    }
})


Router.post("/", async (req, res) => {
    try {
        const { fistname, lastname, email, gender, img } = req.body
        if (!fistname || !lastname || !email || !gender || !img) {
            res.status(404).json({ error: "missing the data filds " })
        }
        const data = await profile.create({
            fistname,
            lastname,
            email,
            gender,
            img
        })
        res.status(200).json({ token: generateToken(data._id) })
    } catch (error) {
        res.status(404).json({ error: error })
    }
})


Router.put("/:_id", async (req, res) => {
    try {
        const data = await profile.findById(req.params._id)
        const update = await profile.findByIdAndUpdate(req.params._id, req.body, {
            new: true
        })
        res.status(202).json(update)
    } catch (error) {
        res.status(404).json({ error: error })

    }
})


Router.delete("/:_id", async (req, res) => {
    try {
        const data = await profile.deleteOne({ id: req.params._id })
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({ error: error })
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: "20d" })
}


module.exports = Router