import { createSlice } from '@reduxjs/toolkit';
import { userPending} from "../services/QuestionService";

export const UserPendingSlice = createSlice({
  name: 'UserPending',
  initialState: {
    userPendingStatus: 'idle',
    userPendingError: null,
    userPendingId: null,
  },
  reducers: {
    resetUserPending: (state) => {
      state.userPendingStatus = 'idle';
      state.userPendingError = null;
      state.userPendingId = null;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(userPending.pending, (state) => {
        state.userPendingStatus = 'loading';
      })
      .addCase(userPending.fulfilled, (state, action) => {
        state.userPendingStatus = 'succeeded';
        state.userPendingStatus = action.payload;
      })
      .addCase(userPending.rejected, (state, action) => {
        state.userPendingStatus = 'failed';
        state.userPendingError = action.error.message;
      });
  },
});
export const { resetUserPending } = UserPendingSlice.actions;
export default UserPendingSlice.reducer;

