import React from "react";
import { useAddTodoMutation } from "../feature/todoApiSlice";

export default function NoteForm() {
  const [trigger] = useAddTodoMutation();
  const handleAdd = (e) => {
    e.preventDefault();
    const noteBody = e.target.body.value;
    const payload = {
      body: noteBody,
    };
    trigger(payload);

    e.target.body.value = "";
  };
  return (
    <form onSubmit={handleAdd}>
      <input
        className="bg-white rounded mr-5 mb-3 p-1"
        type="text"
        name="body"
      />
    </form>
  );
}
