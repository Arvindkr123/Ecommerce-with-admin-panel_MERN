import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import { productApi } from "./features/productApi";

const store = configureStore({
  reducer: {
    products: productReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productApi.middleware);
  },
});

export default store;
