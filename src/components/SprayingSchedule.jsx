import React, { useState, useEffect } from 'react';

const SprayingSchedule = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState([]);
  
  const API_KEY = "c0c5fd3af2b597126736a429558a12c2"; // OpenWeather API key

  // Function to fetch weather data based on lat/lon
  const fetchWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=9&appid=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Determine the quality of spraying based on weather conditions
  const getSprayingQuality = (temp, humidity, windSpeed, cloudCover) => {
    if (cloudCover === 0 && humidity < 60 && windSpeed < 5) {
      return 'Good'; // Ideal weather for spraying
    }
    if (cloudCover < 50 && humidity >= 60 && windSpeed < 7) {
      return 'Moderate'; // Mild conditions
    }
    return 'Bad'; // Unfavorable conditions
  };

  useEffect(() => {
    fetchWeatherData(); // Fetch weather data when component mounts
  }, [lat, lon]);

  // Function to display the quality in UI
  const getSlotIndicator = (quality) => {
    if (quality === 'Good') {
      return <div style={styles.good}>Good</div>;
    } else if (quality === 'Moderate') {
      return <div style={styles.moderate}>Moderate</div>;
    }
    return <div style={styles.bad}>Bad</div>;
  };

  // Process data into slots with time and quality
  const getSlots = () => {
    const slots = [];
    weatherData.forEach((item) => {
      const hour = new Date(item.dt * 1000).getHours(); // Hourly slots
      const time = `${hour}:00`;
      let quality = getSprayingQuality(item.main.temp, item.main.humidity, item.wind.speed, item.clouds.all);
      slots.push({ time, quality });
    });
    return slots;
  };

  const slots = getSlots();

  return (
    <div style={styles.sprayingScheduleContainer}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Spraying Schedule</h1>
        <p style={styles.headerText}>Weather Forecast for Spraying (Good, Moderate, Bad)</p>
      </div>

      <div style={styles.schedule}>
        <div style={styles.slotTypes}>
          <div style={styles.goodSlot}>Good</div>
          <div style={styles.moderateSlot}>Moderate</div>
          <div style={styles.badSlot}>Bad</div>
        </div>

        <div style={styles.sliderContainer}>
          <div style={styles.slider}>
            {slots.length > 0 &&
              slots.map((slot, index) => (
                <div key={index} style={styles.slot}>
                  <span style={styles.time}>{slot.time}</span>
                  {getSlotIndicator(slot.quality)}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline Styles for the Component with Enhanced Design
const styles = {
  sprayingScheduleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    backgroundColor: '#f0f4f8',
    borderRadius: '15px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    width: '80%',
    margin: 'auto',
    marginTop: '25px',
    overflow: 'hidden',
    maxWidth: '1200px',
    border: '1px solid #ddd',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    paddingBottom: '10px',
    borderBottom: '2px solid #ddd',
  },
  headerTitle: {
    fontSize: '30px',
    fontWeight: '700',
    color: '#3b3b3b',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '15px',
  },
  headerText: {
    fontSize: '18px',
    color: '#777',
    fontStyle: 'italic',
  },
  schedule: {
    width: '100%',
    position: 'relative',
    padding: '20px 0',
  },
  slotTypes: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    padding: '5px 20px',
  },
  goodSlot: {
    background: 'linear-gradient(90deg, #58c714 0%, #1da222 100%)',
    padding: '10px',
    borderRadius: '12px',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  },

  moderateSlot: {
    backgroundColor: '#e99815',
    padding: '10px',
    borderRadius: '12px',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  },
  badSlot: {
    backgroundColor: '#e74c3c',
    padding: '10px',
    borderRadius: '12px',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  },
  sliderContainer: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    overflowX: 'scroll', // Allows scrolling but hides the scrollbar
    height: 'auto',
    flexDirection: 'row',
    paddingBottom: '10px',
    marginTop: '20px',
    scrollbarWidth: 'none', /* For Firefox */
  },
  
  slider: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    transition: 'all 0.3s ease',
    padding: '10px 20px',
  },
  
  /* For Webkit-based browsers like Chrome, Safari */
  
  
  slot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90px',
    height: '120px',
    borderRadius: '12px',
    backgroundColor: '#e1e1e1',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 6px 14px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  time: {
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  good: {
    backgroundColor: 'green',
    padding: '8px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
    transition: 'transform 0.3s ease',
  },
  moderate: {
    backgroundColor: 'orange',
    padding: '8px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
    transition: 'transform 0.3s ease',
  },
  bad: {
    backgroundColor: 'red',
    padding: '8px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
    transition: 'transform 0.3s ease',
  },
};

export default SprayingSchedule;
