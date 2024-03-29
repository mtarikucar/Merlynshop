import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,

};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, cartQuantity, product_feature } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id && item.product_feature === product_feature);

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += cartQuantity;

        toast.info(`Added ${state.cartItems[itemIndex].name} to Cart`, {
          position: "bottom-left",
        });
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: isNaN(cartQuantity) ? 1 : cartQuantity,
        };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} Added to Cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseCart(state, action) {
      const { id, product_feature } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id && item.product_feature === product_feature);

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;

        toast.info(
          `Increased ${state.cartItems[itemIndex].name} Cart Quantity`,
          {
            position: "bottom-left",
          }
        );
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} Added to Cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const { id, product_feature } = action.payload;
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== id || cartItem.product_feature !== product_feature
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} Removed from Cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info(`Decreased ${action.payload.name} Cart Quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        toast.error(`${action.payload.name} Removed from Cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
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

      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  getTotals,
  increaseCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;