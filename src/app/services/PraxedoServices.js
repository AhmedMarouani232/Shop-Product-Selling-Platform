import { createAsyncThunk } from '@reduxjs/toolkit';
import { mockTimeSlots, simulateApiDelay, simulateApiSuccess } from '../mockData';

// Mock implementation of PraxedoServices
// This replaces the original API calls with mock data

export const getTimeslots = createAsyncThunk("getTimeslots", async () => {
    try {
        // Simulate API delay
        await simulateApiDelay(600);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.95)) {
            throw new Error('Failed to fetch timeslots');
        }
        
        console.log('Mock: Fetching timeslots data');
        return mockTimeSlots;
    } catch(e) {
        console.error('Mock: Error fetching timeslots:', e);
        throw e;
    }
});

export const intervention = createAsyncThunk("intervention", async ({ id, praxedoVariables, devis_reference }, { dispatch, getState }) => {
    try {
        // Simulate API delay
        await simulateApiDelay(1200);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.9)) {
            throw new Error('Failed to create intervention');
        }
        
        console.log('Mock: Creating intervention:', { id, praxedoVariables, devis_reference });
        
        // Simulate successful intervention creation
        const interventionResult = {
            success: true,
            message: 'Intervention created successfully',
            intervention_id: 'INT-' + Date.now(),
            devis_reference: devis_reference,
            scheduled_date: praxedoVariables.date,
            scheduled_time: praxedoVariables.time
        };
        
        // Simulate dispatching devisMail after successful intervention
        if (interventionResult.success) {
            dispatch(devisMail(devis_reference));
        }
        
        return interventionResult;
    } catch(e) {
        console.error('Mock: Error creating intervention:', e);
        throw e;
    }
});

export const devisMail = createAsyncThunk("devisMail", async (devis_reference) => {
    try {
        // Simulate API delay
        await simulateApiDelay(500);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.9)) {
            throw new Error('Failed to send devis email');
        }
        
        console.log('Mock: Sending devis email for reference:', devis_reference);
        return {
            success: true,
            message: 'Devis email sent successfully',
            devis_reference: devis_reference,
            email_sent_at: new Date().toISOString()
        };
    } catch(e) {
        console.error('Mock: Error sending devis email:', e);
        throw e;
    }
});



