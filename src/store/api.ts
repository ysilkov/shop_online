import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, OrderType } from "../helper";

interface DataGetAuth {
  fullName: string;
  email: string;
  password: string;
}
interface DataGetLogin {
  email: string;
  password: string;
}
interface GetProducts {
  items: number;
}
interface GetCategoryProducts {
  page: number;
  category: string;
}
interface GetTitleProducts {
  brand: string;
  page: number;
}
interface GetBrandCategoryProducts {
  brand: string;
  page: number;
  category: string;
}
interface GetOrder {
  id: string,
  fullName: string;
  email: string;
  phone: string;
  address: string;
  delivery: string;
  order: Array<OrderType>;
  timeCreate: string;
}
interface DataGetSettingsProfile{
  fullName: string;
  email: string;
  password: string;
  id: string
}
interface DataGetSettingsDelivery{
  phone: string;
  address: string;
  id: string
}
interface GetAllOrders{
  id: string
}
export const getAuth = createAsyncThunk(
  "auth/getAuth",
  async (data: DataGetAuth, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("https://fast-bayou-33512.herokuapp.com/api/auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const dataRes = await response.json();

      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
export const getLogin = createAsyncThunk(
  "auth/getLogin",
  async (data: DataGetLogin, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("https://fast-bayou-33512.herokuapp.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (data: GetProducts, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://fast-bayou-33512.herokuapp.com/api/products?limit=${data.items}`
      );
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`https://fast-bayou-33512.herokuapp.com/api/allProducts`);
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
export const getCategoryProducts = createAsyncThunk(
  "categoryProducts/getCategoryProducts",
  async (data: GetCategoryProducts, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://fast-bayou-33512.herokuapp.com/api/sortProductsCategory?limit=${data.page}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category: data.category }),
        }
      );
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
export const getBrandProducts = createAsyncThunk(
  "products/getBrandProducts",
  async (data: GetTitleProducts, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://fast-bayou-33512.herokuapp.com/api/sortProductsBrand?limit=${data.page}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ brand: data.brand }),
        }
      );
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
export const getBrandCategoryProducts = createAsyncThunk(
  "products/getBrandCategoryProducts",
  async (data: GetBrandCategoryProducts, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://fast-bayou-33512.herokuapp.com/api/sortBrandCategoryProducts?limit=${data.page}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ brand: data.brand, category: data.category }),
        }
      );
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
export const getOrder = createAsyncThunk(
  "cart/getOrder",
  async (data: GetOrder, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("https://fast-bayou-33512.herokuapp.com/api/order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
export const getSettingsProfile = createAsyncThunk(
  "auth/getSettingsProfile",
  async (data: DataGetSettingsProfile, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("https://fast-bayou-33512.herokuapp.com/api/settingsProfile/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const dataRes = await response.json();

      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

export const getSettingsDelivery = createAsyncThunk(
  "auth/getSettingsDelivery",
  async (data: DataGetSettingsDelivery, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("https://fast-bayou-33512.herokuapp.com/api/settingsDelivery/", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data),
      });
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
export const getAllOrders = createAsyncThunk(
  "cart/getAllOrders",
  async (data: GetAllOrders, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`https://fast-bayou-33512.herokuapp.com/api/allOrders?id=${data.id}`);
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);