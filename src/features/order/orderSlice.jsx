import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  fetchAllOrders,
  orderPaymentId,
  updateOrder,
} from "./orderAPI";

const initialState = {
  value: 0,
  status: "idle",
  order: [],
  currentOrder: null,
  totalOrders: 0,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);

export const orderPaymentIdAsync = createAsyncThunk(
  "order/orderPayment",
  async (id) => {
    const response = await orderPaymentId(id);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ pagination }) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload.order;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.order.findIndex(
          (order) => order.id === action.payload.id
        );
        state.order[index] = action.payload; //edit order
      })
      .addCase(orderPaymentIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orderPaymentIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // Update the order or handle the returned data if needed
        console.log("Payment processed:", action.payload);
      })
      .addCase(orderPaymentIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Capture the error message
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.order;
export const selectTotalOrders = (state) => state.order.totalOrders;
export default orderSlice.reducer;
