import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GetTodos = () => {
  const [todos, setTodos] = useState([]); // State for storing todos
  const [error, setError] = useState(null); // State for storing error, if any

  // Function to fetch todos
  const fetchTodos = async () => {
    try {
      // Fetch todos from the server
      const response = await fetch("/api/todos", {
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      console.log(data)
      setTodos(data.todos); // Set the retrieved todos in the state
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError(error); // Set the error state if there's an issue with fetching
    }
  };

  // Fetch todos when the component mounts using useEffect
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <div>
        <h2 className="text-center my-5">Todo List</h2>
      </div>

      <div className="todo-grid">
        {todos.map((todo, index) => (
          <div className="card" key={todo._id}>
            <div className="card-body">
              <h5 className="card-title">{todo.name}</h5>
              <p className="card-text">{todo.description}</p>
              <Link to={`/todos/${todo._id}`} className="btn btn-primary">
                View Todo
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetTodos;
