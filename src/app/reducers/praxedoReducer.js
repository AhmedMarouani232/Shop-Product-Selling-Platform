import { createSlice } from '@reduxjs/toolkit';
import {getTimeslots} from "../services/PraxedoServices";

// // createSlice automatically generates action creators and action types that correspond to the reducers and state.

export const TimeslotsSlice = createSlice({
  name: 'timeSlots',
  initialState: {
    timeSlots: {data: []},
    status: 'idle',
    error: null,
    selectedTimeSlot: null
  },
  reducers: {
    setTimeSlot(state, action) {
      state.selectedTimeSlot = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTimeslots.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTimeslots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.timeSlots = action.payload;
      })
      .addCase(getTimeslots.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});
export const { setTimeSlot } = TimeslotsSlice.actions;
export default TimeslotsSlice.reducer;

