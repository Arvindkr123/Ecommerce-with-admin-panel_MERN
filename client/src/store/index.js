import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import { productApi } from "./features/productApi";
import cartSlice from "./features/cartSlice";
import authSlice from "./features/authSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartSlice,
    auth: authSlice,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productApi.middleware);
  },
});

export default store;
