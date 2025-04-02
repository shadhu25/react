import React from "react";
import NoteList from "./NoteList";
import { useGetTodosQuery } from "../feature/todoApiSlice";

export default function Notes() {
  const { data} = useGetTodosQuery();
  console.log({ data });
  return (
    <div>
      <NoteList />
    </div>
  );
}
