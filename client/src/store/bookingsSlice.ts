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
  listings: {
    id: number;
    title: string;
    description: string;
    location: string;
    price_per_night: string;
    image_url: string[];
    average_rating?: string;
  };
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

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId: number, thunkAPI) => {
    try {
      const res = await axios.get(`/api/bookings/${userId}`);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to fetch bookings');
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
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBookingDates } = bookingsSlice.actions;
export default bookingsSlice.reducer;
