import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: 'apiGetTodos',
  keepUnusedDataFor: 5,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  tagTypes: ['getAllTodo','getTodo'],
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      keepUnusedDataFor: 5,
      query: () => "todos",
      transformResponse: (data) => data.todos || [],
      providesTags: ['getAllTodo'],
    }),
    getTodo: builder.query({
      query: (id) => `todos/${id}`
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: 'todos/add',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['getAllTodo'],
    })
  }),
});

export default apiSlice;
export const { useGetAllTodosQuery, useLazyGetTodoQuery, useAddTodoMutation } = apiSlice;
