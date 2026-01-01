const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const { fullName: { firstName, lastName }, email, password } = req.body;

    try {
        const existingUsr = await userModel.findOne({ email });

        if (existingUsr) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            fullName: {
                firstName,
                lastName
            },
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newUser._id }, process.env.jwtSecret, { expiresIn: '1h' });
        res.cookie('token', token);

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message

        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.jwtSecret, { expiresIn: '1h' });
        res.cookie('token', token);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

async function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: "User logged out successfully" });
}

module.exports = {
    register,
    login,
    logout
}