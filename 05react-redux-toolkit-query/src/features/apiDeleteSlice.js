import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiSlice from "./apiSlice";

// not the recommended way
// const apiDeleteSlice = createApi({
//   reducerPath: "apiDeleteTodos",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
//   endpoints: (builder) => ({
//     deleteTodo: builder.mutation({
//       query: (id) => ({
//         url: `todos/${id}`,
//         method: 'DELETE'
//       })
//     })
//   }),
// });

const apiDeleteSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: (id, { dispatch, queryFulfilled }) => {
        const action = dispatch(
          apiSlice.util.updateQueryData("getAllTodos", undefined, (todos) =>
            todos.filter((todo) => todo.id !== id)
          )
        );
        queryFulfilled.catch(() => action.undo())
      },
    }),
  }),
});

export const { useDeleteTodoMutation } = apiDeleteSlice;
