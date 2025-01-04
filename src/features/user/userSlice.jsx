import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetcheLoggedInUser,
  fetcheLoggedInUserOrders,
  updateUser,
} from "./userAPI";

const initialState = {
  value: 0,
  status: "idle",
  // userOrders: [],
  userInfo:null
};

export const fetcheLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetcheLoggedInUserOrders",
  async () => {
    const response = await fetcheLoggedInUserOrders();
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetcheLoggedInUser",
  async () => {
    const response = await fetcheLoggedInUser();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetcheLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetcheLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo.orders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrder = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;



export default userSlice.reducer;
