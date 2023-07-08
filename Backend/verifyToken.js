const { createError } = require("./error");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    if(!req.headers["authorization"]) createError("Invalid Session", 400)
    
    const Header = req.headers["authorization"];

    const Bearer = Header.split(" ");
    const token = Bearer[1]

    if(!token) return createError("You are not authenticated!", 401);

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if(err) return createError("Token is not Valid", 401);
        req.user = user;
        next()
    })
}