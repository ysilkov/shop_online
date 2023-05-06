import { createSlice } from "@reduxjs/toolkit";
import { ProductsType } from "../helper";
import {
  getAllProducts,
  getBrandCategoryProducts,
  getBrandProducts,
  getCategoryProducts,
  getProducts,
} from "./api";

const initialState = {
  products: [] as Array<ProductsType>,
  allProducts: [] as Array<ProductsType>,
  product: [] as Array<ProductsType>,
  message: null,
  order: [] as Array<ProductsType>,
};

export const Products = createSlice({
  name: "products",
  initialState,
  reducers: {
    findProduct: (state, action) => {
      state.product = state.products.filter((el) => el.id === action.payload);
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.allProducts = action.payload;
      })
      .addCase(getBrandProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.allProducts = action.payload;
      })
      .addCase(getBrandCategoryProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.allProducts = action.payload;
      });
  },
});
export const { findProduct, clearProducts } = Products.actions;
export default Products.reducer;
