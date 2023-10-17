import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const TodoDetails = (props) => {
    const [todo, setTodo] = useState({});
    const { id } = useParams(); // Get the 'id' parameter from the route URL.
    const navigate = useNavigate(); // Create a navigation function for routing.

    useEffect(() => {
        // Fetch the details of the todo with the specified 'id' when the component mounts.
        fetch('http://localhost:5000/api/todos/' + id)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTodo(data.todo); // Set the 'todo' state with the fetched data.
            })
            .catch((err) => {
                console.error('Error from TodoDetails:', err); // Log any errors during the fetch.
            });
    }, [id]); // The effect runs whenever 'id' changes.

    // Function to handle the deletion of the todo.
    const onDeleteClick = (id) => {
        fetch('http://localhost:5000/api/todos/' + id, {
            method: 'DELETE', // Send a DELETE request to the server.
        })
            .then(res => {
                if (res.status === 200) {
                    console.log('Todo deleted'); // Log a success message when the todo is deleted.
                    navigate('/todos'); // Navigate to the 'todos' list after deletion.
                } else {
                    console.error('Error deleting todo'); // Log an error message if deletion fails.
                }
            })
            .catch(err => {
                console.error('Error deleting todo:', err); // Log any errors during the deletion process.
            });
    };

    return (
        <>
            <div className='container'>
                <h1>Todo Item</h1>
                <Link to='/todos' className='btn btn-primary mt-3'>Back to List</Link> {/* Link to the list of todos. */}
            </div>
            <ListGroup className='mt-5 mb-2'>
                {todo && todo.name && <ListGroup.Item>Name: {todo.name}</ListGroup.Item>}
                {todo && todo.description && <ListGroup.Item>Description: {todo.description}</ListGroup.Item>}
                {todo && todo.createdAt && <ListGroup.Item>Created At: {todo.createdAt}</ListGroup.Item>}
            </ListGroup>
            <button className='btn btn-danger' onClick={() => onDeleteClick(todo._id)}>Delete</button> {/* Button to delete the todo. */}
            <Link to={`/todos/edit/${todo._id}`} className='btn btn-warning mx-2'>Edit</Link> {/* Link to edit the todo. */}
        </>
    );
};

export default TodoDetails;
