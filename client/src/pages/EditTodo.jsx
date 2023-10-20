import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'

const EditTodo = () => {
  const [todo, setTodo] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch the todo with the specified 'id' when the component mounts.
    fetch(`http://localhost:5000/api/todos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTodo(data.todo) // Set the 'todo' state with the fetched data.
        console.log(todo) // Log the 'todo' data (Note: This may not display the updated value immediately due to closure).
      })
      .catch((err) => console.error('Error fetching todo:', err)) // Log any errors during the fetch.
  }, [id]) // The effect runs whenever 'id' changes.

  // Define a constant for the maximum description length
  const MAX_DESCRIPTION_LENGTH = 140

  // Function to handle updating the todo.
  const onUpdateClick = () => {
    // Check if the description length exceeds the maximum
    if (todo.description && todo.description.length > MAX_DESCRIPTION_LENGTH) {
      toast.error('Maximum characters reached') // Show an error message using the toast library
      return // Exit the function if the description is too long
    }

    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo), // Send the updated 'todo' object.
    })
      .then((res) => {
        if (res.status !== 200) {
          console.log('Problem fetching from the server') // Log an issue if the response status is not 200.
        } else {
          console.log('Todo updated successfully') // Log a success message for a successful update.
          navigate(`/todos/${id}`) // Redirect to the todos page after a successful update.
        }
      })
      .catch((err) => {
        toast.error('Error updating todo:', err) // Display an error message for update failure.
      })
  }

  return (
    <FormContainer>
      <h1>Edit Your Todo List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onUpdateClick() // Call the 'onUpdateClick' function when the form is submitted.
        }}
      >
        <div className='form-group my-2'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={todo.name}
            onChange={(e) => setTodo({ ...todo, name: e.target.value })} // Update the 'name' property in 'todo'.
          />
        </div>
        <div className='form-group my-2'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            className='form-control'
            id='description'
            name='description'
            value={todo.description || ''}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })} // Update the 'description' property in 'todo'.
          />
        </div>
        <button type='submit' className='btn btn-primary mt-3'>
          Update Todo
        </button>
      </form>
    </FormContainer>
  )
}

export default EditTodo
