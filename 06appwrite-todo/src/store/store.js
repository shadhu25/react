import { configureStore } from "@reduxjs/toolkit";
import todoApiSlice from "../feature/todoApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [todoApiSlice.reducerPath]: todoApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApiSlice.middleware),
});
setupListeners(store.dispatch);

export default store;
