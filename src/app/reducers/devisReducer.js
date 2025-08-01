import { createSlice } from '@reduxjs/toolkit';
import { getDevis } from "../services/DevisServices";
import { getDevisStats } from "../services/DevisServices";

// // createSlice automatically generates action creators and action types that correspond to the reducers and state.

export const DevisSlice = createSlice({
  name: 'devis',
  initialState: {
    devisData: null,
    status: 'idle',
    error: null,
    devisStats: null,
    devisStatsStatue: null,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDevis.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDevis.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.devisData = action.payload;
      })
      .addCase(getDevis.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getDevisStats.fulfilled, (state, action) => {
        state.devisStats = action.payload;
      })
      .addCase(getDevisStats.pending, (state) => {
        state.devisStatsStatue = 'loading';
      })
  },
});

export default DevisSlice.reducer;

