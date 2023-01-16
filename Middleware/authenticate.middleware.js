const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        const decoded = jwt.verify(token, "masai")
        if (decoded) {
            const user_id = decoded.user_id
            req.body.user_id=user_id
            next()
        }
        else {
            res.send("please log-in first")
        }
    } else {
        res.send("Please Login first")
    }
}

module.exports = {
    authenticate
}