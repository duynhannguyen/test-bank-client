import { createAsyncThunk } from '@reduxjs/toolkit';
import TestAPI from '~/services/testAPI';

const CREATE_TEST = 'app/create-test';
const FETCH_TEST_BY_ID = 'app/fetch-test-by-id';
const UPDATE_TEST_BY_ID = 'app/update-test-by-id';

export const createTest = createAsyncThunk(
  CREATE_TEST,
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await TestAPI.create();
      return fulfillWithValue(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const fetchTestById = createAsyncThunk(
  FETCH_TEST_BY_ID,
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await TestAPI.getTestById(payload);
      return fulfillWithValue(response.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const updateTestById = createAsyncThunk(
  UPDATE_TEST_BY_ID,
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    const { id, body } = payload;
    try {
      const response = await TestAPI.updateTestById(id, body);
      return fulfillWithValue(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);
