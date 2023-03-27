const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const controller = require("./routes/controllers/usrecontroller")
const ConnectDB = require("./config/database")
ConnectDB()
const port = process.env.PORT || 5000
app.use(express.json())

app.use("/api/usre",controller)


app.listen(port,()=>{
    console.log("===========>",port)
})