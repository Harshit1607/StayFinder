import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  loading: boolean;
  modalOpen: boolean;
}

const initialState: UIState = {
  loading: false,
  modalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    toggleModal(state) {
      state.modalOpen = !state.modalOpen;
    },
  },
});

export const { setLoading, toggleModal } = uiSlice.actions;
export default uiSlice.reducer;
