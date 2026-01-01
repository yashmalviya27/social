const express = require('express');
const { authUser } = require('../middlewares/auth.middleware');
const postController = require('../controllers/post.controller');

const router = express.Router();


router.post('/create', authUser, postController.createPost)


module.exports = router;