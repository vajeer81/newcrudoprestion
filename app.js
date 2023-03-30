const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const controller = require("./routes/controllers/usrecontroller")
const studentcontroller = require("./routes/controllers/studentcontroller")
const productcontroller = require("./routes/controllers/productcontroller")
const wishingcontroller = require("./routes/controllers/wishcontroller")
const fecltycontroller = require("./routes/controllers/fecltycontroller")
const Empcontroller = require("./routes/controllers/employcontroller")
const profilecontroller = require("./routes/controllers/profilecontrollers")



const ConnectDB = require("./config/database")
ConnectDB()
const port = process.env.PORT || 5000
app.use(express.json())

app.use("/api/usre",controller)
app.use("/api/student",studentcontroller)
app.use("/api/product",productcontroller)
app.use("/api/wishing",wishingcontroller)
app.use("/api/feclty",fecltycontroller)
app.use("/api/Emp",Empcontroller)
app.use("/api/profile",profilecontroller)





app.listen(port,()=>{
    console.log("===========>",port)
})