import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: null,
  },
  reducers: {},
});

export default productSlice.reducer;
