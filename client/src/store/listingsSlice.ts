import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  price_per_night: string;
  image_url: string[];
  average_rating?: string;
}

interface ListingsState {
  listings: Listing[];
  singleListing: Listing | null;
  loading: boolean;
  error: string | null;
}

// Load initial state from localStorage
const storedListings = localStorage.getItem('listings');
const storedSingleListing = localStorage.getItem('singleListing');

const initialState: ListingsState = {
  listings: storedListings ? JSON.parse(storedListings) : [],
  singleListing: storedSingleListing ? JSON.parse(storedSingleListing) : null,
  loading: false,
  error: null,
};

export const fetchSingleListing = createAsyncThunk(
  'listings/fetchSingleListing',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/listings');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    clearSingleListing(state) {
      state.singleListing = null;
      localStorage.removeItem('singleListing');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action: PayloadAction<Listing[]>) => {
        state.loading = false;
        state.listings = action.payload;
        localStorage.setItem('listings', JSON.stringify(action.payload));
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSingleListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleListing.fulfilled, (state, action: PayloadAction<Listing>) => {
        state.loading = false;
        state.singleListing = action.payload;
        localStorage.setItem('singleListing', JSON.stringify(action.payload));
      })
      .addCase(fetchSingleListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSingleListing } = listingsSlice.actions;
export default listingsSlice.reducer;
