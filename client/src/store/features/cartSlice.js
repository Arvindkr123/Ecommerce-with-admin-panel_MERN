import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    totalQuantity: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `${state.cartItems[itemIndex].name} increased quantity by 1`
        );
      } else {
        const tempProducts = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProducts);
        toast.success(`${tempProducts.name} added to cart successfully`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      //console.log(action.payload)
      const nextCartItems = state?.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} deleted from cart successfully`);
    },

    decreaseQuantity: (state, action) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[cartItemIndex].cartQuantity > 1) {
        state.cartItems[cartItemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${action.payload.name} cart quantity`);
      } else {
        const nextCartItems = state?.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        toast.error(`${action.payload.name} deleted from cart successfully`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      localStorage.removeItem("cart", JSON.stringify(state.cartItems));
      toast.error("cleared cart successfully");
    },

    getTotals: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.totalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
  getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
