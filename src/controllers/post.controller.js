const Post = require("../models/post.model");
const { generateContent } = require("../services/ai.service");


async function createPost(req, res) {
    const file = req.file;
    console.log(file);

    const base64Image = new Buffer.from(file.buffer).toString('base64');

    const caption = await generateContent(base64Image);
    console.log(caption);
   
}

module.exports = {
    createPost
}