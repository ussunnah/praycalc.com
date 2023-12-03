// src/hooks/useSearchHandler.ts
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAutocomplete } from './useAutocomplete';
import { useSearchResult } from '../context/SearchResultContext';
import { useSearchFormat } from './useSearchFormat';

export const useSearchHandler = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [initialGeoSearchDone, setInitialGeoSearchDone] = useState(false);
  const router = useRouter();
  const { setSearchResult, setOriginalSearchInput } = useSearchResult(); // Now using setOriginalSearchInput
  const {
    inputValue,
    setInputValue,
    autocompleteResults,
    searchError,
    setSearchError,
  } = useAutocomplete();

  // Handle form submission for search
  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement> | Event, isGeoSearch = false) => {
    event.preventDefault();
    setIsSearching(true);
    let searchQuery = inputValue.trim();
    if (searchQuery.length === 0) return

    // Check if input is coordinates pattern
    const coordinatesPattern = /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/;
    const isCoordinateSearch = coordinatesPattern.test(searchQuery);

    // Storing the original input before modifying the search query
    if (isCoordinateSearch || isGeoSearch) {
      setOriginalSearchInput(searchQuery);
      // If it's a coordinate search or geolocation, adjust the search query
      searchQuery = searchQuery.split(',').map(coord => coord.trim()).join('/');
    } else {
      setOriginalSearchInput(null); // Clear the original input if it's not a coordinate search
    }

    const endpoint = isCoordinateSearch || isGeoSearch
      ? `/api/geo/${searchQuery}` // Use endpoint for coordinates
      : `/api/geo/${encodeURIComponent(searchQuery)}`; // Use endpoint for string search

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        setSearchError('No results, please search again.');
        setIsSearching(false);
        setInputValue(''); // Clear the input field if there are no results
      } else {
        setSearchError('');
        const result = await response.json();
        setSearchResult(result); // Store the result in context
        const path = useSearchFormat(result);
        router.push(path);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('An error occurred. Please try again.');
      setIsSearching(false);
    }
  }, [inputValue, setSearchError, router, setSearchResult, setOriginalSearchInput, useSearchFormat]);

  // Function to handle geolocation success
  const handleGeoSuccess = useCallback((position: GeolocationPosition) => {
    if (initialGeoSearchDone) return; // Prevent multiple geolocation searches
    const { latitude, longitude } = position.coords;
    const geoString = `${latitude},${longitude}`;
    setOriginalSearchInput(geoString); // Store the geolocation as the original search input
    setSearchResult({ latitude, longitude }); // Store geolocation in context
    setInputValue(geoString);
    handleSubmit(new Event('submit'), true); // Auto-submit with geolocation
    setInitialGeoSearchDone(true);
  }, [setInputValue, handleSubmit, setSearchResult, setOriginalSearchInput, initialGeoSearchDone]);

  // Function to handle geolocation error
  const handleGeoError = useCallback((error: GeolocationPositionError) => {
    console.error('Geolocation error:', error); // Uncommented to log errors
  }, []);

  // Effect to request geolocation on component mount
  useEffect(() => {
    if (!initialGeoSearchDone && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    }
  }, [handleGeoSuccess, handleGeoError, initialGeoSearchDone]);

  // Handle change event for the search input
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (newValue.trim() === '') {
      setSearchError('');
    }
  }, [setInputValue, setSearchError]);

  return {
    isSearching,
    handleInputChange,
    handleSubmit,
    inputValue,
    searchError,
    setInputValue,
    autocompleteResults,
  };
};
