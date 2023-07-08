const { createError } = require("../error")
const User = require("../model/User")
const Video = require("../model/Video")
// Update User
exports.update = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try {
            
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {$new: true})

            res.status(201).json({
                user
            })

        } catch (error) {
            next(error)
        }
    }else{
        return next(createError("You can only update your account!", 403))
    }
}

// delete User
exports.deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try {
            
            await User.findByIdAndDelete(req.params.id)

            res.status(200).json({
                message: "User Successfully deleted."
            })

        } catch (error) {
            next(error)
        }
    }else{
        return next(createError("You can only delete your account!", 403))
    }
}

// find User
exports.findUser =  async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) return createError("User with this id not found!");
        
        const {password, ...others} = user._doc;

        res.status(200).json({
            user: others
        })
    } catch (error) {
        next(error)
    }
}

// subscribed Channel
exports.subscribedUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id);

        user.subscriptedUser.push(req.params.id);

        await user.save()

        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscriber: 1 }
        })

        res.status(200).json("Subscription Successful!")
    } catch (error) {
        next(error)
    }
}

// Unsubscribe Channel
exports.unSubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscriptedUser: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscriber: -1 }
        })

        res.status(200).json("Unsubscription Successful!")
    } catch (error) {
        next(error)
    }
}

// Like
exports.like = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $addToSet: {like: req.user.id},
            $pull: {dislike: req.user.id}
        })        

        res.status(200).json("The Video has been liked ?")
    } catch (error) {
        next(error)
    }
}

// dislike
exports.dislike = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $addToSet: {dislike: req.user.id},
            $pull: {like: req.user.id}
        })        

        res.status(200).json("The Video has been liked ?")
    } catch (error) {
        next(error)
    }
}
