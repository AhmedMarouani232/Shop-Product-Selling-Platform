import { createSlice } from '@reduxjs/toolkit';
import {getStores, getCurrentStore } from "../services/MagasinServices";

// // createSlice automatically generates action creators and action types that correspond to the reducers and state.

export const StoresSlice = createSlice({
  name: 'stores',
  initialState: {
    stores: null,
    status: 'idle',
    error: null,
    selectedStore: null,
    currentStore : null 
  },
  reducers: {
    setSelectedStoreToState : (state, action) =>{
      state.selectedStore = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stores = action.payload.data;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getCurrentStore.fulfilled, (state, action) =>{
        state.currentStore = action.payload.data.vendor_store;
      })
  },
});

export const { setSelectedStoreToState } = StoresSlice.actions;
export default StoresSlice.reducer;

