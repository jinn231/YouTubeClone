const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    image: {
        type: String
    },
    subscriber: {
        type: Number,
        default: 0
    },
    subscriptedUser: {
        type: [String],
        default: []
    },
    SignInWithGoogle: {
        type: Boolean,
        default: false
    }
}, {timestamps : {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
}})

module.exports = mongoose.model("User", UserSchema);