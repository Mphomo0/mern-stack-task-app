import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AddTodo = () => {
  // Initialize state variables for name and description using the useState hook
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  // Define a constant for the maximum description length
  const MAX_DESCRIPTION_LENGTH = 140

  // Define a function to handle form submission
  const submitTodo = async (e) => {
    e.preventDefault() // Prevent the default form submission behavior

    try {
      // Check if the description length exceeds the maximum
      if (description.length > MAX_DESCRIPTION_LENGTH) {
        toast.error('Maximum characters reached') // Show an error message using the toast library
        return // Exit the function if the description is too long
      }

      // Send a POST request to the API to add a new todo
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }), // Convert data to JSON and send it in the request body
      })

      if (!response.ok) {
        throw new Error('Failed to add todo') // Throw an error if the response is not successful
      }

      toast.success('Todo added successfully') // Show a success message using the toast library

      // Clear the input fields by resetting the state variables
      setName('')
      setDescription('')
    } catch (error) {
      toast.error('Failed to add todo') // Show an error message if there's an error
    }
  }

  return (
    <>
      <div className='container'>
        <h1>Todo Item</h1>
        <Link to='/todos' className='btn btn-primary mt-3'>
          Back to List
        </Link>
      </div>
      <FormContainer>
        <h1>Add your Todo List</h1>
        <Form onSubmit={submitTodo}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)} // Update the 'name' state with input changes
            />
          </Form.Group>
          <Form.Group className='my-2' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update the 'description' state with input changes
            />
          </Form.Group>
          <Button type='submit' variant='primary' className='mt-3'>
            Add Todo
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default AddTodo
