import { createAsyncThunk } from '@reduxjs/toolkit';
import { mockStores, mockCurrentStore, simulateApiDelay, simulateApiSuccess } from '../mockData';

// Mock implementation of MagasinServices
// This replaces the original API calls with mock data

export const getStores = createAsyncThunk("getStores", async () => {
    try {
        // Simulate API delay
        await simulateApiDelay(800);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.95)) {
            throw new Error('Failed to fetch stores');
        }
        
        console.log('Mock: Fetching stores data');
        return mockStores;
    } catch(e) {
        console.error('Mock: Error fetching stores:', e);
        throw e;
    }
});

export const linkVendor = createAsyncThunk("linkVendor", async (store_id) => {
    try {
        // Simulate API delay
        await simulateApiDelay(600);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.9)) {
            throw new Error('Failed to link vendor to store');
        }
        
        console.log(`Mock: Linking vendor to store ${store_id}`);
        return {
            success: true,
            message: `Vendor successfully linked to store ${store_id}`,
            store_id: store_id
        };
    } catch(e) {
        console.error('Mock: Error linking vendor:', e);
        throw e;
    }
});

export const getCurrentStore = createAsyncThunk("getCurrentStore", async () => {
    try {
        // Simulate API delay
        await simulateApiDelay(500);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.95)) {
            throw new Error('Failed to fetch current store');
        }
        
        console.log('Mock: Fetching current store data');
        return mockCurrentStore;
    } catch(e) {
        console.error('Mock: Error fetching current store:', e);
        throw e;
    }
});



