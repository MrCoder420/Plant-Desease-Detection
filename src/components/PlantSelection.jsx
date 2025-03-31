import React, { useEffect, useState } from 'react';

const PlantSelection = ({ lat, lon }) => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [weather, setWeather] = useState(null);
  const [result, setResult] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const API_KEY = "c0c5fd3af2b597126736a429558a12c2"; // OpenWeather API Key

  useEffect(() => {
    fetch('/plants.json')
      .then(res => res.json())
      .then(data => {
        setPlants(data);
        setFilteredPlants(data);
      })
      .catch(error => console.error("Error loading plants:", error));
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
      const data = await response.json();
      setWeather(data.main);
      checkPlantingConditions(data.main);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(event.target.value);
    
    if (query.trim() === "") {
      setFilteredPlants(plants);
      setShowDropdown(false);
    } else {
      const filtered = plants.filter(plant =>
        plant.name.toLowerCase().includes(query)
      );
      setFilteredPlants(filtered.slice(0, 5));
      setShowDropdown(true);
    }
  };

  const handleSelectPlant = (plant) => {
    setSelectedPlant(plant);
    setSearchTerm(plant.name);
    setShowDropdown(false);
  };

  const isCurrentMonthGoodForPlanting = (plant) => {
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
    const monthNames = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    };
    
    // Convert current month number to month name
    const currentMonthName = monthNames[currentMonth];
    
    // Check if current month name is in the best planting months array
    return plant.bestPlantingMonths.includes(currentMonthName);
  };

  const checkPlantingConditions = (weatherData) => {
    if (!selectedPlant || !weatherData) return;

    const temp = weatherData.temp;
    const isGoodMonth = isCurrentMonthGoodForPlanting(selectedPlant);
    let message, status;

    if (isGoodMonth) {
      message = `✅ Good time to plant ${selectedPlant.name}!`;
      status = "good";
    } else {
      message = `❌ Not the right time to plant ${selectedPlant.name}. Best planting months are: ${selectedPlant.bestPlantingMonths.join(", ")}.`;
      status = "bad";
    }

    setResult({ 
      message, 
      status,
      temperature: temp,
      isGoodMonth
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌱 Planting Guide</h1>
      <p style={styles.location}>Location: {lat.toFixed(4)}, {lon.toFixed(4)}</p>

      <div style={styles.searchWrapper}>
        <label style={styles.label}>Select a Plant:</label>
        <input
          type="text"
          placeholder="Search for a plant..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowDropdown(true)}
          style={styles.searchBox}
        />

        {showDropdown && (
          <div style={styles.dropdown}>
            {filteredPlants.length > 0 ? (
              filteredPlants.map((plant, index) => (
                <div
                  key={index}
                  style={styles.dropdownItem}
                  onClick={() => handleSelectPlant(plant)}
                >
                  {plant.name}
                </div>
              ))
            ) : (
              <div style={styles.noResult}>No plants found</div>
            )}
          </div>
        )}
      </div>

      {selectedPlant && (
        <button
          style={styles.button}
          onClick={fetchWeather}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2ecc71'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
        >
          Check Conditions
        </button>
      )}

      {result && (
        <div style={styles.resultBox(result.status)}>
          <h2>{selectedPlant.name} 🌾</h2>
          <p><strong>Best Planting Months:</strong> {selectedPlant.bestPlantingMonths.join(", ")}</p>
          <p><strong>Current Temperature:</strong> {result.temperature.toFixed(1)}°C</p>
          <p>{result.message}</p>
          {result.isGoodMonth && (
            <p style={styles.tip}>💡 This is a good month for planting {selectedPlant.name}!</p>
          )}
        </div>
      )}
    </div>
  );
};

// **Enhanced UI Styling with Animation**
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
  location: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
  },
  searchWrapper: {
    position: 'relative',
    marginBottom: '30px',
  },
  label: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '10px',
  },
  searchBox: {
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
  dropdown: {
    position: 'absolute',
    top: '50px',
    backgroundColor: '#fff',
    width: '100%',
    marginTop: '5px',
    borderRadius: '12px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    maxHeight: '250px',
    overflowY: 'auto',
    padding: '5px 0',
    transition: 'opacity 0.3s ease-out',
  },
  dropdownItem: {
    padding: '15px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    fontWeight: '500',
  },
  dropdownItemHover: {
    backgroundColor: '#f1f1f1',
    transform: 'scale(1.05)',
  },
  noResult: {
    padding: '15px',
    color: '#999',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
    boxShadow: '0px 10px 20px rgba(39, 174, 96, 0.2)',
    transition: '0.3s',
  },
  resultBox: (status) => ({
    marginTop: '30px',
    padding: '25px',
    borderRadius: '15px',
    textAlign: 'center',
    backgroundColor: status === "good" ? "#d4edda" : 
                    status === "cold" ? "#cce5ff" : 
                    status === "hot" ? "#f8d7da" : "#fff3cd",
    color: status === "good" ? "#155724" : 
           status === "cold" ? "#004085" : 
           status === "hot" ? "#721c24" : "#856404",
    fontWeight: '600',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    border: '2px solid',
    borderColor: status === "good" ? "#27ae60" : 
                status === "cold" ? "#3498db" : 
                status === "hot" ? "#e74c3c" : "#ffc107",
  }),
  tip: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
    borderRadius: '8px',
    color: '#27ae60',
    fontWeight: '500',
  },
};

export default PlantSelection;