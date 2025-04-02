const { cakeActions } = require("../cake/cakeSlice");

const { createSlice } = require("@reduxjs/toolkit");

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
  // this is deprecated
  // extraReducers: {
  // ['cake/ordered']: (state) => {
  //   state.noOfIceCream--;
  // }
  // }
  extraReducers: (builder) => {
    builder.addCase(cakeActions.ordered, (state) => {
      state.noOfIceCream--;
    });
  },
});

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;
