import { createSlice } from '@reduxjs/toolkit';
import { TOKEN_TYPES } from '~/utils/constants';
import { fetchCurrentUser } from './userAction';

const initialState = {
  isAuthenticated: false,
  error: null,
  currentUser: {},
  isLoading: false,
  reload: null
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reloadUser: state => {
      state.reload = Math.random();
    },
    login: (state, { payload }) => {
      state.currentUser = payload.user;
      state.isAuthenticated = true;
    },
    logout: state => {
      localStorage.removeItem(TOKEN_TYPES.ACCESS_TOKEN);
      state.isAuthenticated = false;
      state.currentUser = {};
      state.reload = Math.random();
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
});

export const { login, logout, reloadUser } = userSlice.actions;
export default userSlice.reducer;
