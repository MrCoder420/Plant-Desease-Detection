import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import useLocation from '../hooks/useLocation';

// Components
import CropTemperatureWarnings from './CropTemperatureWarnings';
import FertilizerCalculator from './FertilizerCalculator';
import PlantSelection from './PlantSelection';
import SprayingSchedule from './SprayingSchedule';

const GlobalStyle = createGlobalStyle`
  * {
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 200px;
  max-height: 300px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media only screen and (max-width: 768px) {
    padding: 20px;
    min-height: 180px;
    max-height: 250px;
  }
`;

const CardTitle = styled.h3`
  color: #004d04;
  font-size: 18px;
  margin: 0 0 15px 0;
  padding: 0 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.3;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
    margin: 0 0 12px 0;
    padding: 0 8px;
  }
`;

const CardDescription = styled.p`
  color: #2c3e50;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  padding: 0 15px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    font-size: 13px;
    padding: 0 12px;
    -webkit-line-clamp: 3;
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;

  ${Card}:hover & {
    transform: scale(1.1);
  }

  @media only screen and (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin: 0 0 12px 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  padding: 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 15px;
  }
`;

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media only screen and (max-width: 768px) {
    padding: 15px;
    gap: 15px;
  }
`;

const App = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const { location, error } = useLocation();

  const handleCardClick = (componentName) => {
    if (!location) {
      alert("Please allow location access to continue.");
      return;
    }
    setActiveComponent(componentName);
  };

  const handleCloseModal = () => {
    setActiveComponent(null);
  };

  const styles = {
    container: {
      padding: '20px',
      background: 'url("/img/adrien-olichon-jmUAwCkB2X8-unsplash.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '100vh',
      height: '100vh',
      overflowY: 'auto',
      position: 'relative',
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      '&': {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }
    },
    topSection: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '1000px',
      marginBottom: '40px',
      gap: '50px',
      padding: '20px',
    },
    bottomSection: {
      width: '100%',
      maxWidth: '1000px',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '40px',
      padding: '20px',
      marginTop: '10px',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      padding: '5px',
      width: '45%',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: '180px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
      }
    },
    bottomCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
     padding: '5px',
      width: '45%',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: '180px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
      }
    },
    cardLogo: {
      width: '200px',
      height: '200px',
      marginRight: '20px',
      objectFit: 'contain',
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#2C3E50',
      textAlign: 'left',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      padding: '10px 0',
      width: '70%',
      marginBottom: '15px',
      borderBottom: '2px solid #3498db',
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: '#3498db',
    },
    modalBackdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)',
      cursor: 'pointer',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      width: '70%',
      maxWidth: '900px',
      position: 'relative',
    },
    modalCloseButton: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      fontSize: '16px',
      background: 'none',
      border: 'none',
      color: '#666',
      cursor: 'pointer',
      opacity: 0.7,
      padding: '5px',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      '&:hover': {
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      }
    },
  };

  return (
    <>
      <GlobalStyle />
      <div style={styles.container}>
        <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#5f0707', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          Crop Management Tools
        </h1>

        {error && (
          <div style={{ 
            color: 'red', 
            textAlign: 'center', 
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            borderRadius: '5px'
          }}>
            {error}
          </div>
        )}

        <div style={{ ...styles.topSection, position: 'relative', zIndex: 1 }}>
          {/* Card 1: SprayingSchedule */}
          <div
            style={{ ...styles.card, ...styles.cardHover }}
            onClick={() => handleCardClick('SprayingSchedule')}
          >
            <img 
              src="/img/spraying-schedule.png" 
              alt="Spraying Schedule" 
              style={styles.cardLogo}
            />
            <div style={styles.cardContent}>
              <div style={styles.cardTitle}>Spraying Schedule</div>
            </div>
          </div>

          {/* Card 2: PlantSelection */}
          <div
            style={{ ...styles.card, ...styles.cardHover }}
            onClick={() => handleCardClick('PlantSelection')}
          >
            <img 
              src="/img/plant-selection.png" 
              alt="Plant Selection" 
              style={styles.cardLogo}
            />
            <div style={styles.cardContent}>
              <div style={styles.cardTitle}>Plant Selection</div>
            </div>
          </div>
        </div>

        <div style={{ ...styles.bottomSection, position: 'relative', zIndex: 1 }}>
          {/* Card 3: CropTemperatureWarnings */}
          <div
            style={{ ...styles.bottomCard, ...styles.cardHover }}
            onClick={() => handleCardClick('CropTemperatureWarnings')}
          >
            <img 
              src="/img/temperature-warning.png" 
              alt="Temperature Warnings" 
              style={styles.cardLogo}
            />
            <div style={styles.cardContent}>
              <div style={styles.cardTitle}>Crop Temperature Warnings</div>
            </div>
          </div>

          {/* Card 4: FertilizerCalculator */}
          <div
            style={{ ...styles.bottomCard, ...styles.cardHover }}
            onClick={() => handleCardClick('FertilizerCalculator')}
          >
            <img 
              src="/img/fertilizer-calculator.png" 
              alt="Fertilizer Calculator" 
              style={styles.cardLogo}
            />
            <div style={styles.cardContent}>
              <div style={styles.cardTitle}>Fertilizer Calculator</div>
            </div>
          </div>
        </div>

        {/* Modal Window for Active Component */}
        {activeComponent && location && (
          <div
            style={styles.modalBackdrop}
            onClick={handleCloseModal}
          >
            <div
              style={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {activeComponent === 'SprayingSchedule' && <SprayingSchedule lat={location.latitude} lon={location.longitude} />}
              {activeComponent === 'PlantSelection' && <PlantSelection lat={location.latitude} lon={location.longitude} />}
              {activeComponent === 'CropTemperatureWarnings' && <CropTemperatureWarnings lat={location.latitude} lon={location.longitude} />}
              {activeComponent === 'FertilizerCalculator' && <FertilizerCalculator />}
              <button
                style={styles.modalCloseButton}
                onClick={handleCloseModal}
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
