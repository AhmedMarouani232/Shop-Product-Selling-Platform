import { createSlice } from '@reduxjs/toolkit';

export const ClientSlice = createSlice({
    name: 'Client',
    initialState: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        postcode: '',
        city: ''
    },
    reducers: { 
        setClient: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearClient: (state) => {
            return { 
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                address: '',
                postcode: '',
                city: ''
            };  // Reset all fields to their initial values
        }
    },
});

export const { setClient, clearClient } = ClientSlice.actions;
export default ClientSlice.reducer;
