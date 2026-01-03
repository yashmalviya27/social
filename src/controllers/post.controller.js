const Post = require("../models/post.model");
const { upload } = require("../services/image.service");
// const { generateContent } = require("../services/ai.service");


// async function createPost(req, res) {
// const file = req.file;
// console.log(file);

// const base64Image = new Buffer.from(file.buffer).toString('base64');

// const caption = await generateContent(base64Image);
// res.status(201).json({ caption });

// }

async function createPost(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const { caption } = req.body;

        const uploadedImage = await upload(req.file);

        const post = await Post.create({
            image: uploadedImage.url,
            caption: caption || "",
            userId: req.user._id,
        });

        res.status(201).json({
            message: "Post created successfully",
            post,
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

async function getAllPosts(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 20;
        console.log("Limit:", limit);
        const posts = await Post.aggregate([
            { $sample: { size: limit } }
        ]);

        res.status(200).json({
            message: "Posts fetched successfully",
            posts,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

async function editPPost(req, res) {
    try {
        const postId = req.params.postId;
        const { caption } = req.body;
        const post = await Post.findByIdAndUpdate(
            postId,
            { caption },
            { new: true }
        );

        res.status(200).json({
            message: "Post updated successfully",
            post,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}


module.exports = {
    createPost,
    getAllPosts,
    editPPost
}