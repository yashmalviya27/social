const express = require('express');
const multer = require('multer');
const { authUser } = require('../middlewares/auth.middleware');
const postController = require('../controllers/post.controller');

const router = express.Router();
const upload = multer(storage = multer.memoryStorage());


router.post('/create', authUser, upload.single('image'), postController.createPost)
router.get('/all', authUser, postController.getAllPosts)
router.put('/update/:postId', authUser, postController.editPPost)


module.exports = router;