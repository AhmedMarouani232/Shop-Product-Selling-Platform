import { createSlice } from '@reduxjs/toolkit';
import {BorneType} from "../services/QuestionService";

export const BorneTypeSlice = createSlice({
  name: 'BorneType',
  initialState: {
    BorneTypeStatus: 'idle',
    BorneTypeError: null,
    BorneType: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(BorneType.pending, (state) => {
        state.BorneTypeStatus = 'loading';
      })
      .addCase(BorneType.fulfilled, (state, action) => {
        state.BorneTypeStatus = 'succeeded';
        state.BorneType = action.payload;
      })
      .addCase(BorneType.rejected, (state, action) => {
        state.BorneTypeStatus = 'failed';
        state.BorneTypeError = action.error.message;
      });
  },
});

export default BorneTypeSlice.reducer;

