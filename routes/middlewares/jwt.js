const jwt = require("jsonwebtoken")
const users = require("../../db/models/users")
const protect = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            //Get token from headr
            token = req.headers.authorization.split(" ")[1]
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get usereauth from the token
            req.users = await users.findById(decoded.id).select("_password")
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            res.json("not authorized")
        }
    }
    if (!token) {
        res.status(401)
        res.json("not authorized no token")
    }
next()
}

module.exports = {
    protect,
}