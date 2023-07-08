const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    videoId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: {
    createdAt: "createdAt",
    updatedAt: "uppdatedAt"
}})

module.exports = mongoose.model("Comment", CommentSchema)