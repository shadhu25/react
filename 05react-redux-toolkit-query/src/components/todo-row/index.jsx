import React, { useEffect } from "react";
import { useLazyGetTodoQuery } from "../../features/apiSlice";
import { useDeleteTodoMutation } from "../../features/apiDeleteSlice";

export default function TodoRow({ todo }) {
  const { id, todo: name } = todo;
  const [trigger, result] = useLazyGetTodoQuery();
  const { data, isLoading, error, isError } = result;
  // console.log(data?.id);
  // console.log({ isLoading });
  // console.log({ error });
  const [deleteTodoFn, deleteTodoResult] = useDeleteTodoMutation();
  const handleClick = () => {
    trigger(id);
  };
  const handleDelete = () => {
    deleteTodoFn(id);
  };
  useEffect(() => {
    if (deleteTodoResult.isSuccess) {
      alert("deleted");
    }
  }, [deleteTodoResult.isSuccess]);
  return (
    <>
      <div className="todo-row">
        <span>{name}</span>
        <button onClick={handleDelete}>delete</button>
        <button onClick={handleClick}>get status</button>
        {isLoading && <span>loading....</span>}
        {isError && <span>{error.data.message}</span>}
        {data && (
          <span>{data.completed === true ? "completed" : "pending"}</span>
        )}
      </div>
    </>
  );
}
