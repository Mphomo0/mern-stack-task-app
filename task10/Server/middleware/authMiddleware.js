const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Middleware for protecting routes that require authentication
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for the JWT token in the cookies of the request
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verify and decode the JWT token using the JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user associated with the decoded user ID and exclude the password
            req.user = await User.findById(decoded.userId).select('-password');

            // Continue to the next middleware
            next();
        } catch (error) {
            console.error(error);
            res.status(401); // Set the response status to 401 (Unauthorized)
            throw new Error('Not authorized, invalid user'); // Throw an error for invalid tokens
        }
    } else {
        res.status(401); // Set the response status to 401 (Unauthorized)
        throw new Error('Not authorized, no token'); // Throw an error if no token is provided
    }
});

// Export the protect middleware to be used in other parts of the application
module.exports = protect;
