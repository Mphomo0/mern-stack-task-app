const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL); // Connect to the MongoDB using the provided URL
        console.log(`MongoDB connected: ${conn.connection.host}`); // Log a successful connection message
    } catch (error) {
        console.error(`Error: ${error.message}`); // Log an error message if the connection fails
        process.exit(1); // Exit the application with an error code (1) in case of a database connection error
    }
}

module.exports = connectDB; // Export the connectDB function for use in other parts of the application
