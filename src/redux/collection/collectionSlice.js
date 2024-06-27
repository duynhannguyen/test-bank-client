import { createSlice } from '@reduxjs/toolkit';
import { fetchCollections } from './collectionAction';

const initialState = {
  collections: [],
  error: null,
  isLoading: false
};

const collectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchCollections.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
});

// export const {} = collectionSlice.actions;
export default collectionSlice.reducer;
