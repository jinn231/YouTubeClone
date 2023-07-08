const { createError } = require("../error")
const User = require("../model/User")
const Video = require("../model/Video")
const cloudinary = require("./../utils/cloudinary")

// Add Video
exports.addVideo = async (req, res, next) => {
    try {
            // console.log(videoFile)
            await cloudinary.uploader.upload(req.file.path, {
                resource_type: "video"
            }, async (error, result) => {
                if(error){
                    createError("Upload Fail ", 500)
                } else{
                    const createVideo = new Video({ 
                        creator: req.user.id,
                        title: req.body.title,
                        description: req.body.description,
                        video: result.url
                    });
                    await createVideo.save()
      
      
                    res.status(201).json({
                        video: createVideo
                    })
                }
            })         
    
        
    } catch (error) {
        next(error)
    }
}

// Update Video
exports.updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);

        if(!video) return createError("Video not found !", 404)

        if(req.user.id !== video.creator) return createError("You can only update your video.", 403)

        const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { $new: true })

        res.status(201).json({
            video: updateVideo
        })

    } catch (error) {
        next(error)
    }
}

// Delete Video
exports.deleteVideo = async (req, res, next) => {
    try {
        await Video.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message:"Video Deleted !"
        })
    } catch (error) {
        next(error)
    }
}

// get Video
exports.getVideo = async (req, res, next) => {
    try {

        const video = await Video.findById(req.params.id);

        if(!video) return createError("Video Not Found !", 404)

        res.status(200).json({
            video
        })
    } catch (error) {
        next(error)
    }
}

// increase Views 
exports.views = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        }, {new: true})

        res.status(200).json("Increase Views .")

    } catch (error) {
        next(error)
    }
}

// trend
exports.trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        
        res.status(200).json({
            videos
        })
    } catch (error) {
        next(error)
    }
}

// Random 
exports.random = async (req, res, next ) => {
    try {
        const videos = await Video.aggregate([{ $sample: {size: 40} }])

        res.status(200).json({
            videos
        })
    } catch (error) {
        next(error)
    }

}

// subs
exports.subVideo = async (req, res, next) => {

    try {
        const user = await User.findById(req.user.id);
        const subScribedChannels = user.subscriptedUser;
    
        const list = await Promise.all(subScribedChannels.map(channelId => (
            Video.find({creator: channelId})
        )))
    
        res.status(200).json({
            videos: list.flat()
        })
    } catch (error) {
        next(error)
    }

}

// Tags
exports.getByTags = async (req, res, next) => {
    try {
        const tag = req.query.tags.split();

        const video = await Video.find({ tags: { $in: tag}}).limit(50)

        res.status(200).json(video)

    } catch (error) {
        next(error)   
    }
}

// Search By Query
exports.searchByQuery = async (req,res,next) => {
    try {
        const query = req.query.q;

        const videos = await Video.find({ title: { $regex:query, $options: "i" }}).sort(a,b => b.createdAt - a.createdAt);

        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
