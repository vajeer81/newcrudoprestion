const express = require("express")
const jwt = require("jsonwebtoken")
const Router = express.Router()
const feclty = require('../../db/models/fecltymodel');
Router.use(express.json())


Router.get("/", async (req, res) => {
    try {
        const data = await feclty.find({})
        if (!data) {
            res.status(404).json({ error: "data is not found" })
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

Router.get("/find/:_id", async (req, res) => {
    try {
        const data = await feclty.findById(req.params._id)
        if (!data) {
            res.status(404).json({ error: "id is not found" })
        }
    } catch (error) {
        res.status(404).json(error)
    }
})


Router.post("/", async (req, res) => {
    try {
        const { TeacherName,TeacherEmail,TeacherNumber,TeacherQualification,TeacherPost } = req.body
        if (!TeacherName || !TeacherEmail || !TeacherNumber || !TeacherQualification || !TeacherPost) {
            res.status(404).json({ error: "something is missing" })
        }
        const data = feclty.create({
           TeacherName,
           TeacherEmail,
           TeacherNumber,
           TeacherPost,
           TeacherQualification
        })
        res.status(200).json({
            token: generateToken(data._id)
        })

    } catch (error) {
        res.status(404).json(error)
    }
})




Router.put("/:_id", async (req, res) => {
    try {
        const data = await feclty.findById(req.params._id)
        let updatedata = await feclty.findByIdAndUpdate(req.params._id, req.body, {
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
        const finds = await feclty.findByIdAndDelete(req.params._id, req.body)
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