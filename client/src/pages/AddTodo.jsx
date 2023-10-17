import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AddTodo = () => {
    // Define state variables to manage the 'name' and 'description' input fields.
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Define a function to submit a new todo to the server.
  const submitTodo = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    try {
      // Send a POST request to the server with the provided 'name' and 'description'.
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo'); // Handle the case where the request is not successful.
      }

      // If the request is successful, display a success message using the 'toast' library.
      toast.success('Todo added successfully');

      // Clear the 'name' and 'description' input fields.
      setName('');
      setDescription('');
    } catch (error) {
      // If an error occurs during the request, handle it and display an error message to the user.
      toast.error('Failed to add todo');
    }
  };
  
  return (
    <>
     <div className='container'>
                <h1>Todo Item</h1>
                <Link to='/todos' className='btn btn-primary mt-3'>Back to List</Link> {/* Link to the list of todos. */}
            </div>
    <FormContainer>
      <h1>Add your Todo List</h1>

      {/* Create a form for adding a new todo. */}
      <Form onSubmit={submitTodo}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update the 'name' state when the input changes.
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update the 'description' state when the input changes.
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Add Todo
        </Button>
      </Form>
      </FormContainer>
      </>
  )
}

export default AddTodo