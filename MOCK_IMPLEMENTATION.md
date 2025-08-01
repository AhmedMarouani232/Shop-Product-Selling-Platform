# Mock Implementation Documentation

## Overview
This project has been modified to work without a backend API by implementing mock data and services. All API calls have been replaced with mock implementations that simulate the original functionality.

## Changes Made

### 1. Mock Data (`src/app/mockData/index.js`)
Created a comprehensive mock data file containing:
- **Stores data**: 5 mock FNAC stores with addresses and codes
- **Questions data**: Quiz questions for the charging station configuration
- **Time slots**: Available appointment slots for installations
- **Devis data**: Sample quote information
- **User data**: Mock user authentication data
- **Helper functions**: API delay simulation and success rate simulation

### 2. Updated Services
All service files have been updated to use mock data instead of API calls:

#### `src/app/services/MagasinServices.js`
- `getStores()`: Returns mock store data
- `linkVendor()`: Simulates linking vendor to store
- `getCurrentStore()`: Returns mock current store data

#### `src/app/services/QuestionService.js`
- `getQuestions()`: Returns mock quiz questions
- `fillQuiz()`: Simulates quiz submission
- `userPending()`: Simulates user creation
- `BorneType()`: Returns charging station type

#### `src/app/services/PraxedoServices.js`
- `getTimeslots()`: Returns mock appointment slots
- `intervention()`: Simulates intervention creation
- `devisMail()`: Simulates email sending

#### `src/app/services/DevisServices.js`
- `getDevisPdf()`: Generates mock PDF files (as text files)
- `getDevisSummary()`: Generates mock summary files
- `getDevis()`: Returns mock devis data
- `getDevisStats()`: Returns mock statistics

### 3. Authentication Updates
Modified authentication flow to work without backend:

#### `src/pages/Auth.js`
- Replaced external login redirect with mock authentication
- Added mock user data dispatch
- Updated button text to indicate mock mode

#### `src/pages/AzureAuth.js`
- Replaced token verification with mock authentication
- Uses mock user data for authentication
- Simulates successful login process

#### `src/components/VerifyAuth.js`
- Updated redirects to use React Router instead of external URLs
- Simplified token validation

#### `src/app/middlewares/authMiddleware.js`
- Updated redirect URL to internal login page

## Features

### Mock API Behavior
- **Realistic delays**: Each mock API call simulates network delay (200ms - 1500ms)
- **Success/failure simulation**: Random API failures to test error handling
- **Console logging**: All mock operations are logged for debugging
- **Data consistency**: Mock data maintains relationships between entities

### PDF Generation
- Mock PDF generation creates text files instead of actual PDFs
- Files are automatically downloaded with appropriate names
- Content includes realistic devis information

### Authentication Flow
- Mock authentication simulates the complete login process
- Token generation and validation work as expected
- User data is properly stored in Redux state

## Usage

### Starting the Application
```bash
npm start
```

### Authentication
1. Click "Connexion Microsoft (Mock)" button
2. The app will simulate authentication and redirect to the store selection
3. No external authentication is required

### Testing Features
- Store selection works with mock data
- Quiz questions are displayed from mock data
- Appointment scheduling uses mock time slots
- PDF generation creates downloadable text files
- All Redux state management works as expected

## File Structure Preserved
All original file paths and folder structures have been maintained:
- `src/app/services/` - All service files updated with mock implementations
- `src/actions/` - Redux actions remain unchanged
- `src/app/reducers/` - Redux reducers remain unchanged
- `src/pages/` - Page components updated for mock authentication
- `src/components/` - Components updated for mock functionality

## Benefits
1. **No backend dependency**: Application works completely offline
2. **Realistic behavior**: Simulates real API delays and failures
3. **Easy testing**: Consistent mock data for testing scenarios
4. **Development friendly**: No need for external services during development
5. **Preserved functionality**: All original features work with mock data

## Notes
- The mock implementation is clearly marked with "Mock:" prefixes in console logs
- All original API endpoints are preserved in comments for reference
- The application maintains the same user experience as the original
- Mock data can be easily modified in `src/app/mockData/index.js` 