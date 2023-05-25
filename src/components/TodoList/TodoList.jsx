const TodoList = () => {
  const [input, setInput] = useState("Fare la spesa");
  const [todos, setTodos] = useState([]);

  const handleClick = () => {
    const id = todos.length + 1;
    setTodos((prev) => [
      ...prev,
      {
        id: id,
        task: input,
        completed: false,
      },
    ]);
  };

  const markDone = (id) => {
    const list = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    //false = !true
    //true = !false
    setTodos(list);
  };

  return (
    <div>
      <input
        type="text"
        onInput={(event) => {
          setInput(event.target.value);
        }}
      />
      <h1>Todo: {input}</h1>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Add todo
      </button>
      <ul>
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              style={{
                listStyle: "none",
                textDecoration: todo.completed ? "line-through" : "",
              }}
            >
              <input
                type="checkbox"
                defaultChecked={todo.completed}
                onChange={() => markDone(todo.id)}
              />
              {todo.task}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default TodoList;
