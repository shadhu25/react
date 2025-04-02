import React, { useState } from "react";
import TodoRow from "../todo-row";
import { useAddTodoMutation, useGetAllTodosQuery } from "../../features/apiSlice";

export default function TodoList() {
  const { data, isLoading, error } = useGetAllTodosQuery();
  const [enteredTodo, setEnteredTodo] = useState("");
  const [addTodo] = useAddTodoMutation()
  // console.log(data);
  // console.log({ isLoading });
  // console.log({ error });
  console.log(enteredTodo)

  if (isLoading) return <span>Loading.....</span>;
  if (error) return <span>An error</span>;
  const handleAdd = () => {
    setEnteredTodo('')
    addTodo({
      todo: enteredTodo,
      completed: false,
      userId: 100
    })
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={enteredTodo}
          onChange={(e) => setEnteredTodo(e.target.value)}
        />
        <button onClick={handleAdd} >add</button>
      </div>
      <div className="todo-container">
        {data?.map((todo) => (
          <TodoRow key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}
