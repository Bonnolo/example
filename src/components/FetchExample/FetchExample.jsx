import { useState, useEffect } from "react";

const FetchExample = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const todos = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await todos.json();
    console.log(data);

    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <div>
          {todo.id} {todo.title}
        </div>
      ))}
    </div>
  );
};

export default FetchExample;
