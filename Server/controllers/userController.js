const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// Middleware to authenticate a user and issue a token
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id); // Generate and set a JWT token in response cookies
        res.status(201).json({
            _id: user._id,
            name: user.name,
            password: user.password,
        });
    } else {
        res.status(401); // Set the response status to 401 (Unauthorized)
        throw new Error('Invalid Credentials'); // Throw an error for invalid credentials
    }
});

// Middleware to register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400); // Set the response status to 400 (Bad Request)
        throw new Error('User already exists'); // Throw an error for existing users
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id); // Generate and set a JWT token in response cookies
        res.status(201).json({
            _id: user._id,
            name: user.name,
            password: user.password,
        });
    } else {
        res.status(400); // Set the response status to 400 (Bad Request)
        throw new Error('Invalid User data'); // Throw an error for invalid user data
    }
});

// Middleware to log out a user by clearing the JWT token from cookies
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out' });
});

// Middleware to get a user's profile (requires authentication)
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            password: user.password,
        });
    } else {
        res.status(404); // Set the response status to 404 (Not Found)
        throw new Error('User not found'); // Throw an error if the user is not found
    }
});

// Middleware to update a user's profile (requires authentication)
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404); // Set the response status to 404 (Not Found)
        throw new Error('User not found'); // Throw an error if the user is not found
    }
});

// Export the middleware functions to be used in other parts of the application
module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
};
