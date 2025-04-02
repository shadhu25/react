const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  loading: false,
  usersId: [],
  error: "",
};

const fetchUsersId = createAsyncThunk("user/fetchUsersId", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.data.map((user) => user.id));
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsersId.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUsersId.fulfilled, (state, action) => {
      state.loading = false
      state.usersId = action.payload
    })
    builder.addCase(fetchUsersId.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
      state.usersId = []
    })
  },
});

module.exports = userSlice.reducer
module.exports.fetchUsersId = fetchUsersId