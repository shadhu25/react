import { createSlice } from "@reduxjs/toolkit";
import { ordered as cakeOrdered } from "../cake/cakeSlice";

const initialState = {
  noOfIceCream: 10,
};

const iceCreamSlice = createSlice({
  name: "iceCream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.noOfIceCream--;
    },
    restocked: (state, action) => {
      state.noOfIceCream += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state) => {
      state.noOfIceCream--;
    });
  },
});

const iceCreamReducer =  iceCreamSlice.reducer;
export default iceCreamReducer;
export const {ordered, restocked} = iceCreamSlice.actions;
