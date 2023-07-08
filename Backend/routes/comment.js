const express = require("express");
const { verifyToken } = require("../verifyToken");
const { addComment, deleteComment, getComments } = require("../controller/Comment");
const router = express.Router();

router.post("/add-cmt", verifyToken, addComment)

router.delete("/delete-cmt/:id", verifyToken, deleteComment)

router.get("/:id", getComments )

module.exports = router;