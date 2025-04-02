import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noOfCake: 10,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    ordered: (state) => {
      state.noOfCake--;
    },
    restocked: (state, action) => {
      state.noOfCake += action.payload;
    },
  },
});

const cakeReducer = cakeSlice.reducer;
export default cakeReducer;
export const {ordered, restocked} = cakeSlice.actions
