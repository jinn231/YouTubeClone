const express = require("express")
const router = express.Router();
const {update, deleteUser, findUser, subscribedUser, unSubscribe, like, dislike} = require("./../controller/User");
const { verifyToken } = require("../verifyToken");

// user update
router.put("/:id", verifyToken , update)

// user delete
router.delete("/:id",  verifyToken, deleteUser)

// find user
router.get("/find/:id", findUser)

// subscribed Channel
router.put("/sub/:id", verifyToken, subscribedUser)

// unsubscribe
router.put("/unsub/:id", verifyToken, unSubscribe)

// like
router.put("/like/:id", verifyToken, like)

// dislike
router.put("/dislike/:id", verifyToken, dislike)


module.exports = router;