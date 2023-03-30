const express = require("express")
const Router = express.Router()
const employ = require('../../db/models/employmodel');
Router.use(express.json())

const jwt = require('jsonwebtoken')


Router.get("/",async (req, res) => {
    try {
        const data = await employ.find({})
        if (!data) {
            res.status(404).json({ error: "data is not found" })
        }
        res.status(200).json({ alldata: data })
    } catch (error) {
        res.status(404).json(error)
    }
}) 


Router.get("/me/:_id",async (req, res) => {
    try {
        const data = await employ.findById(req.params._id);
        if (!data) {
            res.status(404).json({ error: "data is not found" })
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)

    }

}) 

Router.post("/",async (req, res) => {

    try {
        const { employid, employname, employemail, employselery } = req.body
        if (!employid || !employname || !employemail || !employselery) {
            res.status(400).json({ error: "missing the faild" })
        }
        const data = await employ.create({
            employid,
            employname,
            employselery,
            employemail
        })

        console.log(data);
        res.status(201).json({
            token: generateToken(data._id)

        })

    } catch (error) {
        res.status(404).json(error)

    }
}) 





Router.put("/:_id",async (req, res) => {

    try {
        const data = await employ.findById(req.params._id)
        if (!data) {
            res.status(401).json({ massage: "id is not define" })
        }
        let updatedata = await employ.findByIdAndUpdate(req.params._id, req.body, {
            new: true
        })
        res.status(201).json(updatedata)
    } catch (error) {
        res.status(404).json(error)
    }


 
}) 

Router.delete("/:_id",async (req, res) => {
    try {
        const data = await employ.findById(req.params._id)
        if (!data) {
            res.status(401).json({ massage: "id is not define" })
        }
        await data.remove()
        res.status(200).json(data)
       
    } catch (error) {
        res.status(404).json({ error })
        console.log(error);
    }

}) 

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: "20d" })
}



module.exports = Router