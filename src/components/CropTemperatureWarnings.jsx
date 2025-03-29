import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CropTemperatureWarnings = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [protectionSuggestions, setProtectionSuggestions] = useState([]);
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    // Fetch crops data from the JSON file
    axios
      .get('/crops.json')
      .then((response) => {
        setCrops(response.data.plants);
      })
      .catch((error) => {
        console.error('Error fetching crops data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCrop) {
      // Fetch weather data from OpenWeather API
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=19.96224&lon=73.86842&appid=c0c5fd3af2b597126736a429558a12c2&units=metric`)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [selectedCrop]);

  useEffect(() => {
    if (weatherData && selectedCrop) {
      const crop = crops.find((plant) => plant.name === selectedCrop);
      const currentTemperature = weatherData.main.temp;

      if (currentTemperature < crop.minTemp) {
        setAlertMessage(`⚠️ Frost Warning! Temperature is too low for ${selectedCrop}.`);
        setProtectionSuggestions(crop.frostProtection);
      } else if (currentTemperature > crop.maxTemp) {
        setAlertMessage(`🔥 Heat Warning! Temperature is too high for ${selectedCrop}.`);
        setProtectionSuggestions(crop.heatProtection);
      } else {
        setAlertMessage(`✅ Temperature is within the safe range for ${selectedCrop}.`);
        setProtectionSuggestions([]);
      }
    }
  }, [weatherData, selectedCrop, crops]);

  const styles = {
    container: {
      textAlign: 'center',
      padding: '50px',
      backgroundColor: '#F9F9F9',
      borderRadius: '20px',
      width: '80%',
      margin: 'auto',
      marginTop: '25px',
      boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.15)',
      maxWidth: '700px',
      transition: 'all 0.5s ease-in-out',
      transform: 'translateY(0)',
      animation: 'fadeIn 1s ease-in-out',
    },
    title: {
      fontSize: '40px',
      fontWeight: '700',
      color: '#2C3E50',
      marginBottom: '30px',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      animation: 'bounceIn 1s ease-in-out',
    },
    dropdownContainer: {
      marginBottom: '20px',
    },
    dropdownLabel: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#555',
      marginBottom: '10px',
    },
    cropDropdown: {
      width: '90%',
      padding: '15px',
      fontSize: '16px',
      marginBottom: '10px',
      borderRadius: '12px',
      border: '2px solid #ccc',
      outline: 'none',
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      transition: '0.3s',
      color: '#333',
    },
    alertMessage: {
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#ffeb3b',
      borderRadius: '5px',
      textAlign: 'center',
    },
    suggestionsContainer: {
      marginTop: '10px',
      padding: '10px',
      backgroundColor: '#d4edda',
      borderRadius: '5px',
    },
    suggestionsList: {
      listStyleType: 'none',
      padding: 0,
    },
    suggestionItem: {
      fontSize: '16px',
      margin: '5px 0',
    },
    resultBox: (status) => ({
      marginTop: '30px',
      padding: '25px',
      borderRadius: '15px',
      textAlign: 'center',
      backgroundColor:
        status === 'good' ? '#d4edda' : status === 'cold' ? '#cce5ff' : '#f8d7da',
      color: status === 'good' ? '#155724' : status === 'cold' ? '#004085' : '#721c24',
      fontWeight: '600',
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease-in-out',
      border: '2px solid',
      borderColor: status === 'good' ? '#27ae60' : status === 'cold' ? '#3498db' : '#e74c3c',
    }),
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Crop Temperature Warnings</h1>
      <div style={styles.dropdownContainer}>
        <label style={styles.dropdownLabel}>Select Crop: </label>
        <select
          onChange={(e) => setSelectedCrop(e.target.value)}
          value={selectedCrop}
          style={styles.cropDropdown}
        >
          <option value="">Select a crop</option>
          {crops.map((crop) => (
            <option key={crop.name} value={crop.name}>
              {crop.name}
            </option>
          ))}
        </select>
      </div>

      {alertMessage && (
        <div style={styles.alertMessage}>
          <h2>{alertMessage}</h2>
          {protectionSuggestions.length > 0 && (
            <div style={styles.suggestionsContainer}>
              <h3>Protection Suggestions:</h3>
              <ul style={styles.suggestionsList}>
                {protectionSuggestions.map((suggestion, index) => (
                  <li key={index} style={styles.suggestionItem}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {alertMessage && (
        <div style={styles.resultBox(alertMessage.includes('Warning') ? 'cold' : 'good')}>
          {alertMessage.includes('Warning') ? 'Temperature Alert' : 'Good Temperature for Growth'}
        </div>
      )}
    </div>
  );
};

export default CropTemperatureWarnings;
