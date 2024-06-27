import { createSlice } from '@reduxjs/toolkit';
import { createTest, fetchTestById, updateTestById } from './testAction';

const initialState = {
  test: {},
  questions: [],
  error: null,
  isLoading: false
};

const testSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(createTest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTest.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(createTest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTestById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTestById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.test = action.payload;
        state.questions = action.payload.questions;
      })
      .addCase(fetchTestById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateTestById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTestById.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(updateTestById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
});

export const { setQuestions } = testSlice.actions;
export default testSlice.reducer;
