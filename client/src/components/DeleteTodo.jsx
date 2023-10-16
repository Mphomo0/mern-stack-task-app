import React, { useEffect } from 'react'

const DeleteTodo = () => {
    const handleDelete = async (id) => {
        try {
            // Send a DELETE request to the API endpoint for deleting the todo item
            const response = await fetch(`https://mernstack-todo-app.onrender.com/api/todos/${id}`);
      
            if (!response.ok) {
              throw new Error("Failed to delete the todo");
            }
      
            // Redirect the user back to the list of todos after successful deletion
            history.push("/todos");
          } catch (error) {
            console.error("Error deleting todo:", error);
          }
      };

      useEffect(() => {
        handleDelete()
      })
    
  return (
    <div>DeleteTodo</div>
  )
}

export default DeleteTodo