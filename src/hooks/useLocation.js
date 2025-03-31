import { useEffect, useState } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isGPSActive, setIsGPSActive] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    let watchId = null;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    // Function to get location with high accuracy
    const getHighAccuracyLocation = () => {
      return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            if (position.coords.accuracy <= 20) {
              resolve(position);
            } else {
              reject(new Error('Accuracy not good enough'));
            }
          },
          reject,
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
          }
        );
      });
    };

    // Function to get location with network fallback
    const getNetworkLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });
    };

    // Function to handle successful location updates
    const handleSuccess = (position) => {
      const newLocation = {
            latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
        timestamp: new Date(position.timestamp).toLocaleString(),
        source: position.coords.altitude ? 'GPS' : 'Network',
        isHighAccuracy: position.coords.accuracy <= 20
      };

      setLocation(newLocation);
      setIsGPSActive(true);
      retryCount = 0;

      // Log detailed location information
      console.log('Live Location Update:', {
        ...newLocation,
        accuracyInMeters: `${position.coords.accuracy.toFixed(2)} meters`,
        signalStrength: position.coords.accuracy <= 10 ? 'Excellent' :
                       position.coords.accuracy <= 20 ? 'Good' :
                       position.coords.accuracy <= 50 ? 'Fair' : 'Poor',
        timestamp: new Date(position.timestamp).toLocaleString()
      });
    };

    // Function to handle location errors
    const handleError = async (error) => {
      let errorMessage = 'Unable to retrieve your location';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location permission denied. Please enable location services.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information unavailable. Please check your GPS signal.';
          break;
        case error.TIMEOUT:
          errorMessage = 'Location request timed out. Please try again.';
          break;
        default:
          errorMessage = 'An unknown error occurred while getting location.';
          break;
      }
      setError(errorMessage);
      console.error('Location Error:', errorMessage);
      setIsGPSActive(false);

      // Try to get network location as fallback
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        try {
          const networkPosition = await getNetworkLocation();
          handleSuccess(networkPosition);
        } catch (networkError) {
          console.error('Network location fallback failed:', networkError);
        }
      }
    };

    // Function to start continuous location updates
    const startLocationUpdates = async () => {
      try {
        // First try to get high accuracy location
        const highAccuracyPosition = await getHighAccuracyLocation();
        handleSuccess(highAccuracyPosition);

        // Then start watching position for continuous updates
        watchId = navigator.geolocation.watchPosition(
          handleSuccess,
          handleError,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } catch (error) {
        console.log('High accuracy location failed, trying network location...');
        try {
          const networkPosition = await getNetworkLocation();
          handleSuccess(networkPosition);
        } catch (networkError) {
          handleError(networkError);
        }
      }
    };

    // Start location updates
    startLocationUpdates();

    // Cleanup function to stop watching position when component unmounts
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return { location, error, isGPSActive };
};

export default useLocation; 