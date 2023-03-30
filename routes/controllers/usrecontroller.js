const user = require("../../db/models/users")
const jwt = require("jsonwebtoken")
const bycrpt = require("bcrypt")
const express = require("express")
const app = express()
const router = express.Router()
router.use(express.json())

router.get("/", async (req, res) => {
    try {
        const data = await user.find({})
        if (!data) {
            res.status(404).json({ error: "data is missing" })
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({ error })

    }

})



router.get("/:_id", async (req, res) => {
    try {
        const data = await user.findById(req.params._id)
        if (!data) {
            res.status(404).json({ error: "data is missing" })
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({ error })

    }
})



router.post("/", async (req, res) => {
    const { name, email, password, dob, salery } = req.body
    if (!name || !email || !password || !dob || !salery) {
        res.status(400).json("please add all fields");
    }
    //check userExits user email
    const userExists = await user.findOne({ email })
    // console.log("=======>SDS userExists====>",userExists);
    if (userExists) {
        res.status(400).json("Email already exits")
    } else {
        console.log("wertyu========>>>", password.length);
        if (password.length > 8 || password.length < 8) {

            res.status(400).json("password length should be minimum 8 character")

        }
    }

    let checkemail = email.includes("@gmail.com")
    if (!checkemail) {
        res.status(400).json("please add the @gmail.com")
    }

    const passwordhash = await bycrpt.hash(password, 10)


    const data = await user.create({
        name,
        email,
        password: passwordhash,
        dob,
        salery
    })


    if (data) {
        res.status(201).json({
            _id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            dob: data.dob,
            salery: data.salery,
            token: generateToken(data._id)

        })

    } else {
        res.status(400).json("data is already exits")
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const finds = await user.findOne({ email: email })
    if (finds && bycrpt.compare(password == finds.password)) {
        res.status(201).json({
            name: finds.name,
            salery: finds.salery,
            email: finds.email,
            token: generateToken(finds._id)
        })
    }
}
)


router.put("/:_id", async (req, res) => {
    const data = await user.findById(req.params._id)
    if (!data) {
        res.status(401).json({ massage: "id is not define" })
    }
    let updatedata = await user.findByIdAndUpdate(req.params._id, req.body, {
        new: true
    })
    console.log("=========>", updatedata)
    res.status(200).json({
        token: generateToken({ massage: `data is update ` })
    })
    //  res.status(200).json({message : `updatedata ${req.params._id}`})
})


router.delete("/:_id", async (req, res) => {
    const data = await user.findById(req.params._id)
    if (!data) {
        res.status(401).json({ massage: "id is not define" })
    }

    await data.remove()

    res.status(200).json({
        token: generateToken({ massage: `data is delete` })
    })
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: "40d" })
}


module.exports = router