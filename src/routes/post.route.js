const express = require('express');
const multer = require('multer');
const { authUser } = require('../middlewares/auth.middleware');
const postController = require('../controllers/post.controller');

const router = express.Router();
const upload = multer(storage = multer.memoryStorage());


router.post('/create', authUser, upload.single('image'), postController.createPost)


module.exports = router;