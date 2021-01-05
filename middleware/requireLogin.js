const jwt = require("jsonwebtoken")
const User = require("../models/user");


module.exports = (req, res, next) => {
    const {authorization} = req.headers
    //authorization === Bearer cdfgdtw4dgdgdfg(token)
    if(!authorization){
        return res.status(401).json({
            error: "You must first log in"
        })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if(err) {
            return res.status(401).json({
                error: "you must first log in"
            })
        }
        const {id} = payload
        User.findById(id).then(userdata => {
            req.user = userdata
            next()
        })
        
    })
}