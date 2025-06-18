import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import listingsReducer from './listingsSlice';
import bookingsReducer from './bookingsSlice';
import uiReducer from './uiSlice';
import paymentReducer from './paymentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
    bookings: bookingsReducer,
    ui: uiReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;