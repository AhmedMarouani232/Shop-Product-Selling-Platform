import { createAsyncThunk } from '@reduxjs/toolkit';
import { mockQuestions, mockUserPending, simulateApiDelay, simulateApiSuccess } from '../mockData';

// Mock implementation of QuestionService
// This replaces the original API calls with mock data

export const getQuestions = createAsyncThunk("getQuestions", async () => {
    try {
        // Simulate API delay
        await simulateApiDelay(700);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.95)) {
            throw new Error('Failed to fetch questions');
        }
        
        console.log('Mock: Fetching quiz questions');
        return mockQuestions.data.quiz_questions;
    } catch(e) {
        console.error('Mock: Error fetching questions:', e);
        throw e;
    }
});

export const fillQuiz = createAsyncThunk("fillQuiz", async (quizData) => {
    try {
        // Simulate API delay
        await simulateApiDelay(1000);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.9)) {
            throw new Error('Failed to submit quiz');
        }
        
        console.log('Mock: Submitting quiz data:', quizData);
        
        // Generate mock devis data based on quiz responses
        const borneType = quizData.quiz[0]?.responses_ids[0] === 1 ? "Câble attaché" : "Prise T2S";
        const puissance = quizData.quiz[1]?.responses_ids[0] === 3 ? "3.7 kW" : 
                         quizData.quiz[1]?.responses_ids[0] === 4 ? "7.4 kW" :
                         quizData.quiz[1]?.responses_ids[0] === 5 ? "11 kW" : "22 kW";
        
        // Calculate prices based on borne type and puissance
        let basePrice = 0;
        if (puissance === "3.7 kW") basePrice = 800;
        else if (puissance === "7.4 kW") basePrice = 1200;
        else if (puissance === "11 kW") basePrice = 1500;
        else if (puissance === "22 kW") basePrice = 2000;
        
        const montant_ttc = basePrice;
        const montant_cibre = basePrice * 0.3; // 30% CIBRE reduction
        
        return {
            success: true,
            message: 'Quiz submitted successfully',
            quiz_id: 'QUIZ-' + Date.now(),
            data: {
                ...quizData,
                devis_data: {
                    devis_id: 'DEVIS-' + Date.now(),
                    devis_ref: 'DEV-' + Date.now(),
                    montant_ttc: montant_ttc,
                    montant_cibre: montant_cibre,
                    borne_type: borneType,
                    puissance: puissance
                },
                line_devis_data: [
                    {
                        id: 1,
                        description_article: `Borne de recharge ${borneType} - ${puissance}`,
                        quantite: 1,
                        prix_unitaire: basePrice,
                        prix_total: basePrice
                    },
                    {
                        id: 2,
                        description_article: "Installation et mise en service",
                        quantite: 1,
                        prix_unitaire: 200,
                        prix_total: 200
                    }
                ]
            }
        };
    } catch(e) {
        console.error('Mock: Error submitting quiz:', e);
        throw e;
    }
});

export const userPending = createAsyncThunk("userPending", async (client) => {
    try {
        // Simulate API delay
        await simulateApiDelay(800);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.9)) {
            throw new Error('Failed to create pending user');
        }
        
        console.log('Mock: Creating pending user:', client);
        return {
            success: true,
            message: 'User created successfully',
            user_id: 'USER-' + Date.now(),
            client: client,
            data: mockUserPending.data
        };
    } catch(e) {
        console.error('Mock: Error creating pending user:', e);
        throw e;
    }
});

export const BorneType = createAsyncThunk("BorneType", async (index) => {
    try {
        // Simulate API delay
        await simulateApiDelay(200);
        
        console.log(`Mock: Getting borne type for index ${index}`);
        if(index === 0){
            return "Câble attaché";
        }else{
            return "Prise T2S";
        }
    } catch(e) {
        console.error('Mock: Error getting borne type:', e);
        throw e;
    }
});
