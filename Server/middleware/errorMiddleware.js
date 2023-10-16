// Middleware for handling 404 Not Found errors
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`); // Create an error with a descriptive message
    res.status(404); // Set the response status code to 404 (Not Found)
    next(error); // Pass the error to the next middleware in the chain
}

// Middleware for handling application errors
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Determine the appropriate status code based on the response status or default to 500 (Internal Server Error)
    let message = err.message; // Use the error's message as the default error message

    // Check if the error is a Mongoose CastError for an ObjectId
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404; // If it's a CastError, set the status code to 404 (Not Found)
        message = 'Resource not Found'; // Set a specific error message for CastErrors
    }

    // Send a JSON response with the error details
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Include the error stack trace in development mode
    });
}

// Export the middleware functions to be used in other parts of the application
module.exports = {
    notFound,
    errorHandler
}
