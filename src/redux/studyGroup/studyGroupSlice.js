import { createSlice } from '@reduxjs/toolkit';
import { fetchStudyGroup } from './studyGroupAction';
import { FaGlasses } from 'react-icons/fa6';
const initialState = {
  studyGroup: [],
  error: null,
  isLoading: false
};

const studyGroupSlice = createSlice({
  name: 'studyGroups',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchStudyGroup.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudyGroup.fulfilled, (state, { payload }) => {
        state.studyGroup = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchStudyGroup.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  }
});

export default studyGroupSlice.reducer;
