// src/hooks/useGeolocation.ts
import { useCallback, useEffect } from 'react';
import { useSearchHandler } from './useSearchHandler';

export const useGeolocation = () => {
  const { setInputValue, handleSubmit } = useSearchHandler();

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const geoString = `${latitude},${longitude}`;
    setInputValue(geoString);
    handleSubmit(new Event('geo'));
  }, [setInputValue, handleSubmit]);

  const handleError = useCallback((error: GeolocationPositionError) => {
    //console.error('Geolocation error:', error);
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }
  }, [handleSuccess, handleError]);
};