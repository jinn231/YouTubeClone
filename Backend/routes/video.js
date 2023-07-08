const express = require("express")
const router = express.Router();
const { verifyToken } = require("../verifyToken");
const { addVideo, updateVideo, deleteVideo, getVideo, subVideo, random, trend, views, getByTags, searchByQuery } = require("../controller/Video");

// add Videos
router.post("/add",verifyToken, addVideo  )

// update Videos
router.put("/:id",verifyToken, updateVideo )

// delete Videos
router.delete("/:id",verifyToken, deleteVideo )

// find Video
router.get("/find/:id", getVideo )

// Video views
router.put("/views/:id", views)

// get trend video
router.get("/trend", trend )

// get random videos
router.get("/random", random)

// gte sub's video
router.get("/sub", verifyToken, subVideo )

// tags 
router.get("/Tags", getByTags )

// search by query
router.get("/search", searchByQuery )

module.exports = router;