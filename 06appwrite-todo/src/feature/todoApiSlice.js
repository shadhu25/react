import { createApi } from "@reduxjs/toolkit/query/react";

import axios from "axios";
import { databases } from "../appwrite/config";
import { databaseId, todosCollectionId } from "../appwrite/env";
import { ID } from "appwrite";

const todoApiSlice = createApi({
  reducerPath: "todo",
  tagTypes: ["getTodosTag", "addTodoTag"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      queryFn: async () => {
        try {
          const response = await databases.listDocuments(
            databaseId,
            todosCollectionId
          );
          return { data: response.documents };
        } catch (error) {
          return {
            error: { status: error.response?.status, data: error.message },
          };
        }
      },
      transformErrorResponse: (data) => data.data,
      providesTags: ["getTodosTag"],
    }),
    addTodo: builder.mutation({
      queryFn: async (todo) => {
        try {
          const response = await databases.createDocument(
            databaseId,
            todosCollectionId,
            ID.unique(),
            todo
          );
          return { data: response.documents };
        } catch (error) {
          return {
            error: { status: error.response?.status, data: error.message },
          };
        }
      },
      invalidatesTags: ["getTodosTag"],
    }),
    updateTodo: builder.mutation({
      queryFn: async (payload) => {
        try {
          const response = await databases.updateDocument(
            databaseId,
            todosCollectionId,
            payload.id,
            payload.newTodo
          );
          return { data: response.documents };
        } catch (error) {
          return {
            error: { status: error.response?.status, data: error.message },
          };
        }
      },
      invalidatesTags: ["getTodosTag"],
    }),
    deleteTodo: builder.mutation({
      queryFn: async (id) => {
        try {
          const response = await databases.deleteDocument(
            databaseId,
            todosCollectionId,
            id
          );
          return { data: response.documents };
        } catch (error) {
          return {
            error: { status: error.response?.status, data: error.message },
          };
        }
      },
      invalidatesTags: ["getTodosTag"],
    }),
  }),
});
export default todoApiSlice;
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApiSlice;
