const express = require('express');
const { authUser } = require('../middlewares/auth.middleware');

const router = express.Router();


router.post('/create', authUser,)


module.exports = router;