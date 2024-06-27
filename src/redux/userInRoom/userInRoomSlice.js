import { createSlice } from '@reduxjs/toolkit';
import { socket } from '~/components/Socket/Socket';

const initialState = {
  error: null,
  usersInRoom: [],
  isLoading: false
};

const usersInRoomSlice = createSlice({
  name: 'usersInRoom',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      const exitstinguser = state.usersInRoom.find(oldUser => oldUser._id === payload._id);
      if (!exitstinguser) {
        state.usersInRoom = [...state.usersInRoom, payload];
      }
    }
  }
});

export const { addUser } = usersInRoomSlice.actions;
export default usersInRoomSlice.reducer;
