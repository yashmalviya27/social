const Post = require("../models/post.model");
const { generateContent } = require("../services/ai.service");


async function createPost(req, res) {
    const {content , caption , user} = req.body;
    const file = req.file;
    const userId = req.user.id;
    try {
        const base64Image = new Buffer.from(file.buffer).toString('base64');
        const cap = await generateContent(base64Image);
        const newPPost = await Post.create({
            content,
            caption: cap,
            user: userId
        })

      res.status(201).json({ message: "Post created successfully", newPPost });

        
    } catch (error) {
        res.status(500).json({ error: "Failed to create post", details: error.message });
    }

}

module.exports = {
    createPost
}