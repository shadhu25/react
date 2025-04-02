import TodoRow from "./NoteRow";
import NoteForm from "./NoteForm";
import { useGetTodosQuery } from "../feature/todoApiSlice";

function NoteList() {
  const { data: todos } = useGetTodosQuery();
  return (
    <>
      <NoteForm />
      <div>
        {todos?.map((todo) => (
          <TodoRow key={todo.$id} todo={todo} />
        ))}
      </div>
    </>
  );
}

export default NoteList;
