import { createAsyncThunk } from '@reduxjs/toolkit';
import CollectionAPI from '~/services/collectionAPI';

const FETCH_COLLECTIONS = 'app/fetch-collections';

export const fetchCollections = createAsyncThunk(
  FETCH_COLLECTIONS,
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await CollectionAPI.getMyCollections();
      const collections = response.data.data;
      return fulfillWithValue(collections);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);
