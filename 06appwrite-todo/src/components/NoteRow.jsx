import React from "react";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../feature/todoApiSlice";

export default function NoteRow({ todo }) {
  const [trigger1] = useUpdateTodoMutation();
  const [trigger2] = useDeleteTodoMutation();
  const handleCompleted = () => {
    const completed = todo.completed == true ? false : true;
    trigger1({ id: todo.$id, newTodo: { completed } });
  };
  return (
    <div className="flex gap-2 mb-1 text-white font-bold">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={todo.completed}
        onChange={handleCompleted}
      />
      <div
        className={`bg-amber-600 rounded p-1 ${
          todo.completed === true ? "line-through text-gray-300" : ""
        }`}
      >
        {todo.body}
      </div>
      <div>
        <button
          className="bg-red-400 rounded p-1"
          onClick={() => trigger2(todo.$id)}
        >
          delete
        </button>
      </div>
    </div>
  );
}
