import { createSlice, configureStore } from "@reduxjs/toolkit";

let First = createSlice({
  name: "first",
  initialState: {},
  reducers: {},
});

const store = configureStore({
  reducer: {
    first: First.reducer,
  },
});

export default store;