import { useState, useEffect } from "react";
import { supabaseClient } from "../../supabase-client.js";
import { get, set } from "react-hook-form";

const TodoList = () => {
  // const state = useState();
  // const input = state[0];
  // const setInput = state[1];
  // const [document, { state }] = useSinglePrismicDocument("homepage");
  const [input, setInput] = useState("Fare la spesa");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      const { data } = await supabaseClient
        .from("todos")
        .select()
        .order("id", { ascending: false })
        .eq("user_id", user?.id);

      console.log(data);
      setTodos(data);
    };

    getTodos();
  }, []);

  const addTodo = async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    const { data } = await supabaseClient
      .from("todos")
      .upsert({
        user_id: user.id,
        title: input,
        isComplete: false,
      })
      .select();

    setTodos((prev) => [...prev, ...data]);
  };

  const markDone = async (id, isComplete) => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    const { data } = await supabaseClient
      .from("todos")
      .update({
        user_id: user.id,
        isComplete: !isComplete,
      })
      .eq("id", id)
      .select();

    console.log(data);

    const list = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !isComplete;
      }

      return todo;
    });

    setTodos(list);
  };

  return (
    <div>
      {/* example fetch component */}
      {/* <FetchExample></FetchExample> */}
      {/* example image from prismic */}
      {/* {state === "loaded" && <img src={document.data.hero_image.url} alt="" />} */}
      <input type="text" onInput={(e) => setInput(e.target.value)} />
      <h1>TODO: {input}</h1>
      <button onClick={addTodo}>Add todo</button>
      <ul>
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              style={{
                listStyle: "none",
                textDecoration: todo.isComplete ? "line-through" : "",
              }}
            >
              <input
                type="checkbox"
                defaultChecked={todo.isComplete}
                onChange={() => markDone(todo.id, todo.isComplete)}
              />
              {todo.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
