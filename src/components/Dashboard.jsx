import React, { useState } from 'react';

// Components
import CropTemperatureWarnings from './CropTemperatureWarnings'; // Example component
import PlantSelection from './PlantSelection'; // Example component
import SprayingSchedule from './SprayingSchedule'; // Example component

const App = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleCardClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleCloseModal = () => {
    setActiveComponent(null);
  };

  const styles = {
    container: {
      padding: '20px',
      background: 'url("https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '100vh',
      height: '100vh',
      overflowY: 'scroll',
      scrollbarWidth: 'thin',
      scrollbarColor: '#888 #f1f1f1',
      position: 'relative',
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
      justifyContent: 'center',
      marginBottom: '40px',
      padding: '20px',
      marginTop: '10px',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      padding: '25px',
      width: '45%',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
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
      padding: '20px',
      width: '35%',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '150px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
      }
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#2C3E50',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      padding: '10px 0',
      width: '100%',
      marginBottom: '15px',
      borderBottom: '2px solid #3498db',
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: '#3498db',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
    },
    modalBackdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)', // Apply blur effect to background
      cursor: 'pointer', // Change cursor to pointer to indicate interactivity
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
    <div style={styles.container}>
      <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#2C3E50', marginBottom: '50px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        Crop Management Dashboard
      </h1>

      <div style={{ ...styles.topSection, position: 'relative', zIndex: 1 }}>
        {/* Card 1: SprayingSchedule */}
        <div
          style={{ ...styles.card, ...styles.cardHover }}
          onClick={() => handleCardClick('SprayingSchedule')}
        >
          <div style={styles.cardTitle}>Spraying Schedule</div>
        </div>

        {/* Card 2: PlantSelection */}
        <div
          style={{ ...styles.card, ...styles.cardHover }}
          onClick={() => handleCardClick('PlantSelection')}
        >
          <div style={styles.cardTitle}>Plant Selection</div>
        </div>
      </div>

      <div style={{ ...styles.bottomSection, position: 'relative', zIndex: 1 }}>
        {/* Card 3: CropTemperatureWarnings */}
        <div
          style={{ ...styles.bottomCard, ...styles.cardHover }}
          onClick={() => handleCardClick('CropTemperatureWarnings')}
        >
          <div style={styles.cardTitle}>Crop Temperature Warnings</div>
        </div>
      </div>

      {/* Modal Window for Active Component */}
      {activeComponent && (
        <div
          style={styles.modalBackdrop}
          onClick={handleCloseModal} // Close the modal if backdrop is clicked
        >
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to the backdrop
          >
            {activeComponent === 'SprayingSchedule' && <SprayingSchedule lat={19.9622} lon={73.8684} />}
            {activeComponent === 'PlantSelection' && <PlantSelection lat={19.9622} lon={73.8684} />}
            {activeComponent === 'CropTemperatureWarnings' && <CropTemperatureWarnings />}
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
  );
};

export default App;
