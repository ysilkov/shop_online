import { createSlice } from "@reduxjs/toolkit";
import { getAuth, getLogin, getSettingsDelivery, getSettingsProfile } from "./api";

type InitialState = {
  id: string | null;
  fullName: string | null;
  email: string | null;
  message: string | null;
  token: string | null;
  phone:string |  null;
  address: string | null;
};
const initialState: InitialState = {
  id: null,
  fullName: null,
  email:  null,
  phone:  null,
  address:  null,
  message: null,
  token:  null,
};

export const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser(state) {
      state.id = null;
      state.email = null;
      state.token = null;
      state.fullName = null;
      state.message = null;
      state.phone = null;
      state.address = null;
    },
    userUpdate(state, action) {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.message = action.payload.message;
    },
    removeMessageAuth(state){
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuth.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.message = action.payload.message;
        state.email = action.payload.email;
        state.fullName = action.payload.fullName;
        state.token = action.payload.token;
      })
      .addCase(getLogin.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.message = action.payload.message;
        state.email = action.payload.email;
        state.fullName = action.payload.fullName;
        state.token = action.payload.token;
        state.phone = action.payload.phone !== undefined ? action.payload.phone : null ;
        state.address = action.payload.address !== undefined ? action.payload.address : null;
      })
      .addCase(getSettingsProfile.fulfilled, (state, action) => {
        console.log(action.payload.message)
        state.message = action.payload.message;
        state.email = action.payload.email;
        state.fullName = action.payload.fullName;
      })
      .addCase(getSettingsDelivery.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.phone = action.payload.phone;
        state.address = action.payload.address;
      });
  },
});
export const { removeUser, userUpdate, removeMessageAuth } = Auth.actions;
export default Auth.reducer;
