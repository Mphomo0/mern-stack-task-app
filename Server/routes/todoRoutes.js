// Import the Express framework
const express = require('express')
const checkMaxLength = require('../middleware/checkMaxLength')

// Import the controller functions from the 'todoController' module
const {
  createTodo,
  getAllTodos,
  getTodo,
  deleteTodo,
  updateTodo,
} = require('../controllers/todoController')

// Create an Express Router
const router = express.Router()

// Define routes for different HTTP methods and associate them with controller functions

// POST request to create a new todo item
router.post('/', checkMaxLength, createTodo)

// GET request to retrieve all todo items
router.get('/', getAllTodos)

// GET request to retrieve a specific todo item by its unique 'id'
router.get('/:id', getTodo)

// DELETE request to delete a specific todo item by its unique 'id'
router.delete('/:id', deleteTodo)

// PUT request to update a specific todo item by its unique 'id'
router.put('/:id', checkMaxLength, updateTodo)

// Export the router to be used in other parts of the application
module.exports = router
