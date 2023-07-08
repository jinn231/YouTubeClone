const bcrypt = require("bcrypt");
const User = require("../model/User");
const {createError} = require("./../error");
const JWT = require("jsonwebtoken");

exports.SignUp = async (req, res, next) => {
    try {        

        await User.findOne({ email: req.body.email }) && createError("User with this e-mail already exists. Please login", 400) 

        const hash = await bcrypt.hash(req.body.password, 12);

        const user = new User({...req.body, password: hash});
        await user.save();

        res.status(201).json({
            user: user,
            message: "User is successfully created !"
        })

    } catch (error) { 
        next(error);
    }
}

exports.SignIn = async (req, res, next) => {
    try {        
        const user = await User.findOne({ email: req.body.email })

        if(!user) return createError("User Not Found !", 404)

        const isAuth = await bcrypt.compare(req.body.password, user.password)

        if(!isAuth) return createError("Wrong Crenditial !", 401)

        const token = JWT.sign({ id: user._id}, process.env.SECRETKEY);

        const {password, ...others} = user._doc;

        res.cookie("access_cookie", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .status(201).json({
            user: others
        })
    } catch (error) { 
        next(error);
    }
}

exports.SignInWithGoogle = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user){
            const token = await JWT.sign({ id: user._id}, process.env.SECRETKEY, {
                expiresIn: "1d"
            });

            res.status(200).json({...user._doc, access_token: token})
        }else{
            const user = new User({...req.body, SignInWithGoogle:true})

            const savedUser = await user.save();
            const token = await JWT.sign({ id: savedUser._id}, process.env.SECRETKEY);
 
            res.status(201).json({...savedUser._doc, access_token: token});
        }
    } catch (error) {
        next(error)
    }

}

exports.signOut = async (req, res, next) => {
    try {
        res.status(200).json("Signed out.")   
    } catch (error) {
        next(error)
    }
}
