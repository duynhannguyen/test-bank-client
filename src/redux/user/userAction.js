import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthAPI from '~/services/authAPI';

const FETCH_CURRENT_USER = 'app/fetch-current-user';

export const fetchCurrentUser = createAsyncThunk(
  FETCH_CURRENT_USER,
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await AuthAPI.fetchCurrentUser();
      const userData = response.data;
      return fulfillWithValue(userData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);
