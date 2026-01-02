const express = require('express');
const authRoutes = require('./routes/auth.route');
const postRoutes = require('./routes/post.route');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());



app.use('/social/auth', authRoutes);
app.use('/social/posts',postRoutes);



module.exports = app;