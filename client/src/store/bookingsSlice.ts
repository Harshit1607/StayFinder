import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Booking {
  id: number;
  guest_id: number;
  listing_id: number;
  start_date: string;
  end_date: string;
  total_price: string;
  rating?: number;
}

interface BookingsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  checkIn: string | null;
  checkOut: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
  checkIn: null,
  checkOut: null,
};

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (data: Omit<Booking, 'id'>, thunkAPI) => {
    try {
      const response = await axios.post('/api/bookings', data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookingDates: (state, action: PayloadAction<{ checkIn: string; checkOut: string }>) => {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBookingDates } = bookingsSlice.actions;
export default bookingsSlice.reducer;
