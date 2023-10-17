const mongoose = require('mongoose');
const Todo = require('../models/todoModel');

// Create a new todo
async function createTodo(req, res) {
    try {
      const { name, description } = req.body;
  
      if (!name || !description) {
        return res.status(400).json({ error: 'Please enter all the details' });
      }
  
      const existingTodo = await Todo.findOne({ name, description });
  
      if (existingTodo) {
        return res.status(409).json({ error: 'Todo already exists with the given description' });
      }
  
      const newTodo = new Todo({
        name,
        description,
      });
  
      await newTodo.save();
  
      return res.status(201).json({ message: 'Todo created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An internal server error occurred' });
    }
}


// Get all todos
const getAllTodos = async (req, res) => {
    try {
        // Fetch all todos from the database
        const todos = await Todo.find();

        return res.status(200).json({ todos });

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({ error: 'An internal server error occurred' });
    }
}

// Get a specific todo by ID
async function getTodo(req, res) {
    try {
        const todoId = req.params.id; // Access the todo id from the request parameters

        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ error: 'Invalid todoId' });
        }

        // Fetch one todo from the database
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).json({ todo });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Delete a todo by ID
async function deleteTodo(req, res) {
    try {
        const todoId = req.params.id;

        // Validate the provided ID
        if (!mongoose.isValidObjectId(todoId)) {
            return res.status(400).json({ message: 'Invalid todo ID' });
        }

        // Find and delete the todo
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Update a todo by ID
async function updateTodo(req, res) {
    try {
      const todoId = req.params.id;
  
      // Validate the provided ID
      if (!mongoose.isValidObjectId(todoId)) {
        return res.status(400).json({ message: 'Invalid todo ID' });
      }
  
      const { name, description } = req.body;
  
      // Find the todo by ID
      const todo = await Todo.findById(todoId);
  
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      // Update the name and description fields
      if (name) todo.name = name;
      if (description) todo.description = description;
  
      // Save the updated todo
      await todo.save();
  
      return res.status(200).json({ message: 'Todo updated successfully', updatedTodo: todo });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    createTodo,
    getAllTodos,
    getTodo,
    deleteTodo,
    updateTodo
};
