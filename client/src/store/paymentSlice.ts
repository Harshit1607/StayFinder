import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Order {
  id: string;
  amount: number;
  // Add more fields as needed
}

interface UserOrder {
  id: number;              // ✅ Add this line
  guest_id: number;
  listing_id: number;
  start_date: string;
  end_date: string;
  total_price: string;
  payment: boolean;
}

interface PaymentState {
  order: Order | null;
  userOrder: UserOrder | null;
  loading: boolean;
  error: string | null;
  makePayment: boolean;
}

const initialState: PaymentState = {
  order: null,
  userOrder: null,
  loading: false,
  error: null,
  makePayment: false,
};

interface CreateOrderPayload {
  amount: number;
  userId: number;
  listingId: number;
  checkIn: Date;
  checkOut: Date;
}

interface OrderResponse {
  order: Order;
  userOrder: UserOrder;
}

export const createOrder = createAsyncThunk<OrderResponse, CreateOrderPayload>(
  'payment/createOrder',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post('/api/payment/create-order', payload);
      return res.data as OrderResponse;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Order creation failed');
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'payment/verifyPayment',
  async (
    { orderId, paymentDetails }: { orderId: number; paymentDetails: any },
    thunkAPI
  ) => {
    try {
      const res = await axios.post('/api/payment/verify', {
        orderId,
        paymentDetails,
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Payment verification failed');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<OrderResponse>) => {
        state.loading = false;
        state.order = action.payload.order;
        state.userOrder = action.payload.userOrder;
        state.makePayment = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyPayment.fulfilled, state => {
        state.makePayment = false;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.makePayment = false;
        state.error = action.payload as string;
        alert("Payment verification failed: " + state.error);
      });
  },
});

export default paymentSlice.reducer;
