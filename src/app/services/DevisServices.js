import { createAsyncThunk } from '@reduxjs/toolkit';
import { mockDevis, mockDevisStats, simulateApiDelay, simulateApiSuccess } from '../mockData';

// Mock implementation of DevisServices
// This replaces the original API calls with mock data

export const getDevisPdf = createAsyncThunk("getDevisPdf", async (reference) => {
    try {
        // Simulate API delay
        await simulateApiDelay(1500);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.8)) {
            throw new Error('Failed to generate PDF');
        }
        
        console.log('Mock: Generating PDF for devis reference:', reference);
        
        // Create a mock PDF content (simple text file for demo)
        const mockPdfContent = `
            DEVIS - ${reference}
            
            Client: Jean Dupont
            Email: jean.dupont@email.com
            Téléphone: 0123456789
            
            Adresse: 123 Rue de la Paix, 75001 Paris
            
            Borne de recharge: Câble attaché - 7.4 kW
            Prix: 1200€
            
            Installation prévue: 15/01/2024 à 10:00
            
            Total: 1200€
            
            Ceci est un devis généré automatiquement.
        `;
        
        const blob = new Blob([mockPdfContent], { type: "text/plain" });
        const pdfUrl = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `Ahmed-${reference}.txt`;
        link.click();
        
        // Clean up the blob URL after the download is initiated
        URL.revokeObjectURL(pdfUrl);
        
        return { success: true, message: 'PDF generated successfully' };
    } catch(e) {
        console.warn("Mock: PDF introuvable pour la facture ", reference);
        console.error(e);
        throw e;
    }
});

export const getDevisSummary = createAsyncThunk(
    "getDevisSummary",
    async (data) => {
      try {
        // Simulate API delay
        await simulateApiDelay(1200);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.8)) {
            throw new Error('Failed to generate summary PDF');
        }
        
        console.log('Mock: Generating summary PDF for devis reference:', data.devisRef);
        
        // Create a mock summary PDF content
        const mockSummaryContent = `
            RÉSUMÉ DEVIS - ${data.devisRef}
            
            Date de création: ${new Date().toLocaleDateString()}
            
            Détails du devis:
            - Type de borne: ${data.borneType || 'Câble attaché'}
            - Puissance: ${data.puissance || '7.4 kW'}
            - Prix: ${data.prix || '1200€'}
            
            Statut: En attente de confirmation
            
            Ceci est un résumé généré automatiquement.
        `;
        
        const blob = new Blob([mockSummaryContent], { type: "text/plain" });
        const pdfUrl = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `Ahmed-${data.devisRef}-summary.txt`;
        link.click();
        
        // Clean up the blob URL after the download is initiated
        URL.revokeObjectURL(pdfUrl);
        
        return { success: true, message: 'Summary PDF generated successfully' };
      } catch (e) {
        console.warn("Mock: PDF introuvable pour la facture ", data.devisRef);
        console.error(e);
        throw e;
      }
    }
);

export const getDevis = createAsyncThunk("getDevis", async (reference) => {
    try {
        // Simulate API delay
        await simulateApiDelay(800);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.95)) {
            throw new Error('Failed to fetch devis');
        }
        
        console.log('Mock: Fetching devis for reference:', reference);
        return mockDevis.data;
    } catch(e) {
        console.error('Mock: Error fetching devis:', e);
        throw e;
    }
});

export const getDevisStats = createAsyncThunk("getDevisStats", async () => {
    try {
        // Simulate API delay
        await simulateApiDelay(600);
        
        // Simulate occasional API failure
        if (!simulateApiSuccess(0.95)) {
            throw new Error('Failed to fetch devis stats');
        }
        
        console.log('Mock: Fetching devis statistics');
        return mockDevisStats;
    } catch(e) {
        console.error('Mock: Error fetching devis stats:', e);
        throw e;
    }
});
