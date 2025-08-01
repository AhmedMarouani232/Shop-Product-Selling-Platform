# Quick Setup Guide - Mock Implementation

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### First Time Setup
1. **Start the application**: Run `npm start`
2. **Access the app**: Open http://localhost:3000 in your browser
3. **Login**: Click "Connexion Microsoft (Mock)" button
4. **Explore**: Navigate through the application using mock data

## 🔧 What's Changed

### Before (with Backend)
- Required external API server
- Needed authentication tokens
- API calls to real endpoints
- External dependencies

### After (Mock Implementation)
- ✅ Works completely offline
- ✅ No external API required
- ✅ Mock authentication
- ✅ Realistic data simulation

## 📁 Key Files Modified

```
src/
├── app/
│   ├── mockData/
│   │   └── index.js          # 📄 Mock data definitions
│   ├── services/
│   │   ├── MagasinServices.js    # 🔄 Updated for mock
│   │   ├── QuestionService.js    # 🔄 Updated for mock
│   │   ├── PraxedoServices.js    # 🔄 Updated for mock
│   │   └── DevisServices.js      # 🔄 Updated for mock
│   └── middlewares/
│       └── authMiddleware.js     # 🔄 Updated for mock
├── pages/
│   ├── Auth.js               # 🔄 Updated for mock auth
│   └── AzureAuth.js          # 🔄 Updated for mock auth
└── components/
    └── VerifyAuth.js         # 🔄 Updated for mock auth
```

## 🎯 Features Available

### ✅ Working Features
- **Authentication**: Mock login system
- **Store Selection**: Choose from 5 mock FNAC stores
- **Quiz System**: Answer questions about charging stations
- **Appointment Booking**: Schedule installation appointments
- **PDF Generation**: Download mock devis documents
- **Dashboard**: View mock statistics and data
- **User Management**: Mock user profiles and settings

### 📊 Mock Data Includes
- 5 FNAC stores across France
- 4 quiz questions with multiple choice answers
- 10 available appointment time slots
- Sample devis with realistic pricing
- User statistics and reports

## 🐛 Troubleshooting

### Common Issues

**Q: App doesn't start**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

**Q: Images not loading**
- Check that `public/images/` folder exists
- Ensure all SVG and PNG files are present

**Q: Mock data not appearing**
- Check browser console for "Mock:" prefixed logs
- Verify Redux DevTools for state changes

### Console Logs
Look for these prefixes in browser console:
- `Mock: Fetching stores data`
- `Mock: Authentication successful`
- `Mock: Generating PDF for devis reference`

## 🔄 Switching Back to Real API

If you need to restore the original API implementation:

1. **Restore service files**: Replace mock implementations with original axios calls
2. **Update authentication**: Restore external auth URLs
3. **Remove mock data**: Delete `src/app/mockData/` folder
4. **Update environment**: Set `REACT_APP_API_URL` in `.env`

## 📝 Development Notes

- All mock operations are logged with "Mock:" prefix
- API delays are simulated (200ms - 1500ms)
- Random failures are simulated for testing
- PDF generation creates text files instead of actual PDFs
- Authentication tokens are generated locally

## 🎉 Success!

Your FNAC Devis application is now running with mock data and no backend dependencies! 