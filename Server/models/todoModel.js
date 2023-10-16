const mongoose = require("mongoose");

// Define the todo schema using Mongoose
const todoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true, // Name is required
            minlength: 4, // Name must be at least 4 characters long
        },
        description: {
            type: String,
            required: true, // Description is required
            minlength: 7, // Description must be at least 7 characters long
            maxlength: 140, // Description can be at most 140 characters long
        },
    },
    {
        timestamps: true, // Add timestamps (createdAt and updatedAt) to the documents
    }
);

// Create a Todo model based on the todo schema
const Todo = mongoose.model("todo", todoSchema);

// Export the Todo model to be used in other parts of the application
module.exports = Todo;
