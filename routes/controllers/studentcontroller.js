const student = require("../../db/models/productmodel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const Router = express.Router()
Router.use(express.json())



Router.get("/", async (req, res) => {
    try {
        const data = await student.find({})
        if (!data) {
            res.status(404).json({ error: "data is not found" })
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

Router.get("/find/:_id", async (req, res) => {
    try {
        const data = await student.findById(req.params._id)
        if (!data) {
            res.status(404).json({ error: "id is not found" })
        }
    } catch (error) {
        res.status(404).json(error)
    }
})


Router.post("/", async (req, res) => {
    try {
        const { name, school, email, dob } = req.body
        if (!name || !school || !email || !dob) {
            res.status(404).json({ error: "something is missing" })
        }
        const data = student.create({
            name,
            school,
            email,
            dob
        })
        res.status(200).json({
            token: generateToken(data._id)
        })

    } catch (error) {
        res.status(404).json(error)
    }
})

Router.post("/login", async (req, res) => {
    try {
        const { email, name } = req.body
        const data = await student.findOne({ email })
        if (data && name == data.name) {
            res.status(202).json({
                name: data.name,
                email: data.email,
                dob: data.dob,
                school: data.school,
                token: generateToken(data._id)

            })
        }
    } catch (error) {
        res.status(404).json(error)
    }
})


Router.put("/:_id", async (req, res) => {
    try {
        const data = await student.findById(req.params._id)
        let updatedata = await student.findByIdAndUpdate(req.params._id, req.body, {
            new: true
        })
        console.log("=========>", updatedata)
        res.status(200).json({
            token: generateToken({ massage: `data is update ` })
        })
    } catch (error) {
        res.status(404).json(error)
    }
})


Router.delete("/:_id", async (req, res) => {
    try {
        const finds = await student.findByIdAndDelete(req.params._id, req.body)
        if (!finds) {
            res.status(404).json({ error: "id is missing" })
        }

    } catch (error) {
        res.status(404).json(error)

    }
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: "40d" })
}


module.exports = Router