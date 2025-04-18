# Plant Disease Detection System

A comprehensive web application for detecting plant diseases and providing fertilizer recommendations for agricultural crops.

## Features

### 1. Plant Disease Detection
- Upload plant images for disease detection
- Real-time disease identification using AI
- Location-based tracking of plant diseases
- Detailed disease information and symptoms
- Treatment recommendations for detected diseases

### 2. Fertilizer Calculator
- Crop-specific fertilizer recommendations
- NPK (Nitrogen, Phosphorus, Potassium) calculations
- Multiple unit support (Acre, Hectare, Gunta)
- Three different fertilizer combinations:
  - MOP/TSP/UREA
  - DAP/MOP/UREA
  - 10-26-26/TSP/UREA
- Interactive plot size adjustment
- Detailed calculation results

### 3. Treatment Steps
- AI-powered treatment recommendations
- Step-by-step treatment instructions
- Safety precautions and best practices
- Materials required for treatment
- Follow-up care instructions

## Technologies Used

### Frontend
- **React.js**: Modern UI development
- **Styled Components**: Styling and responsive design
- **Axios**: API integration and data fetching
- **HTML5/CSS3**: Structure and styling

### APIs and Services
- **OpenRouter AI API**: For treatment recommendations
- **Crop Kindwise API**: For plant disease detection
- **Geolocation API**: For location tracking

### Development Tools
- **Node.js**: Runtime environment
- **npm**: Package management
- **Git**: Version control

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx           # Main landing page
│   ├── Dashboard.jsx      # Dashboard component
│   ├── TreatmentSteps.jsx # Treatment recommendations
│   └── FertilizerCalculator.jsx # Fertilizer calculations
├── data/
│   └── fertilizer_data.json # Crop and fertilizer data
├── styles/
│   └── GlobalStyles.js    # Global styling
└── App.js                 # Main application component
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your API keys:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## API Integration

### Plant Disease Detection
- Uses Crop Kindwise API for image analysis
- Requires API key for authentication
- Supports various plant types and diseases

### Treatment Recommendations
- Uses OpenRouter AI API
- Generates detailed treatment steps
- Includes safety precautions and best practices

### Fertilizer Calculator
- Uses predefined crop data from JSON
- Calculates optimal fertilizer combinations
- Supports multiple units and plot sizes

## Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Touch-friendly interface
- Optimized for both desktop and mobile viewing

## Security Features
- Secure API key management
- Environment variable protection
- Input validation and sanitization
- Error handling and user feedback

## Future Enhancements
1. User authentication system
2. Disease history tracking
3. Weather integration
4. Crop rotation recommendations
5. Disease outbreak alerts
6. Community sharing features
7. Expert consultation system

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any queries or support, please contact:
- Email: [your-email]
- GitHub: [your-github-profile]
