const { createError } = require("../error");
const Comment = require("../model/Comment");

exports.addComment = async (req, res, next) => {
    try {
        const savedComment = new Comment({...req.body, userId: req.user.id})

        await savedComment.save()
        res.status(201).json(savedComment)
    } catch (error) {
        next(error)
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const videoId = req.params.videoId;
        const cmtId = req.params.cmtId;

        const cmt = Comment.findById(cmtId);

        if(req.user.id === cmt.userId && videoId === cmt.videoId){
            await Comment.findByIdAndDelete(cmtId);

            res.status(200).json("Comment Successfully delete!")
        }else{
            createError("Invalid Request !", 401)
        }
        
    } catch (error) {
        next(error)
    }
}

exports.getComments = async (req, res, next) => {
    try {
 
        const comments = await Comment.find({ videoId: req.params.id}).sort({ createdAt: -1 });

        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}