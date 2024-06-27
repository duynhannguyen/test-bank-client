import { createAsyncThunk } from '@reduxjs/toolkit';
import studyGroupAPI from '~/services/studyGroupAPI';

const FETCH_GROUP_BY_ID = 'app/fetch-study-group';

export const fetchStudyGroup = createAsyncThunk(
  FETCH_GROUP_BY_ID,
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await studyGroupAPI.getGroupById();

      return fulfillWithValue(response.data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
