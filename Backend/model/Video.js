const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    video: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    },
    like: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    dislike: {
        type: [mongoose.Types.ObjectId],
        default: []
    }
    
}, {timestamps : {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
}})

module.exports = mongoose.model("Videos", VideoSchema)