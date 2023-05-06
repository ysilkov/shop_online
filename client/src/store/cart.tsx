import { createSlice } from "@reduxjs/toolkit";
import { OrderSuccesfulType, OrderType, ProductsType } from "../helper";
import { getAllOrders, getOrder } from "./api";

const initialState = {
  products: [] as Array<ProductsType>,
  order: [] as Array<OrderType>,
  allOrders: [] as Array<OrderSuccesfulType>,
  message: null,
};

export const Cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    orderProducts: (state, action) => {
      state.products = action.payload;
    },
    orderProduct: (state, action) => {
      const productToAdd = state.products.find(
        (el) => el.id === action.payload.id
      );
      if (productToAdd) {
        const existingProductIndex = state.order.findIndex(
          (el) => el.id === productToAdd.id
        );
        if (existingProductIndex >= 0) {
          state.order[existingProductIndex].count = action.payload.count;
        } else {
          state.order.push({ ...productToAdd, count: action.payload.count });
        }
      }
    },
    changeCountProduct: (state, action) => {
      state.order = state.order.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, count: parseInt(action.payload.count) };
        } else {
          return el;
        }
      });
    },
    removeOrder: (state, action) => {
      state.order = state.order.filter((el) => el.id !== action.payload);
    },
    removeAllOrder: (state) => {
      state.order = [];
    },
    removeMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.message = action.payload.message;
    })
    .addCase(getAllOrders.fulfilled, (state, action) =>{
      console.log(action.payload.message)
      state.message = action.payload.message;
      state.allOrders = action.payload.orders === undefined ? [] : action.payload.orders;
    });
  },
});
export const {
  orderProduct,
  orderProducts,
  removeOrder,
  removeAllOrder,
  changeCountProduct,
  removeMessage,
} = Cart.actions;
export default Cart.reducer;
