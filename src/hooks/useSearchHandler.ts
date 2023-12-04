// src/hooks/useSearchHandler.ts
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAutocomplete } from './useAutocomplete';
import { useSearchResult } from '../context/SearchResultContext';
import { getSearchPath } from '../utils/getSearchPath';  // Importing the utility function
import { SearchResult } from '../types/search';

export const useSearchHandler = () => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [initialGeoSearchDone, setInitialGeoSearchDone] = useState(false);
  const [searchResult, setSearchResultState] = useState<SearchResult | null>(null);
  const { setSearchResult, setOriginalSearchInput } = useSearchResult();
  const { inputValue, setInputValue, autocompleteResults, searchError, setSearchError } = useAutocomplete();

  // Handle form submission for search
  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement> | Event, isGeoSearch = false) => {
    event.preventDefault();
    setIsSearching(true);
    let searchQuery = inputValue.trim();
    if (searchQuery.length === 0) {
      setIsSearching(false);
      return;
    }

    const coordinatesPattern = /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/;
    const isCoordinateSearch = coordinatesPattern.test(searchQuery);

    if (isCoordinateSearch || isGeoSearch) {
      setOriginalSearchInput(searchQuery);
      searchQuery = searchQuery.split(',').map(coord => coord.trim()).join('/');
    } else {
      setOriginalSearchInput(null);
    }

    const endpoint = isCoordinateSearch || isGeoSearch
      ? `/api/geo/${searchQuery}`
      : `/api/geo/${encodeURIComponent(searchQuery)}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        setSearchError('No results, please search again.');
        setIsSearching(false);
        setInputValue('');
      } else {
        setSearchError('');
        const result = await response.json();
        setSearchResult(result);
        setSearchResultState(result);
      }
    } catch (error) {
      setSearchError('An error occurred. Please try again.');
      setIsSearching(false);
    }
  }, [inputValue, setSearchError, setSearchResult, setOriginalSearchInput, setInputValue]);

  // Effect to handle search result change and navigate
  useEffect(() => {
    if (searchResult) {
      const path = getSearchPath(searchResult);  // Use the utility function
      router.push(path);
    }
  }, [searchResult, router]);

  // Function to handle geolocation success
  const handleGeoSuccess = useCallback((position: GeolocationPosition) => {
    if (initialGeoSearchDone) return;
    const { latitude, longitude } = position.coords;
    const geoString = `${latitude},${longitude}`;
    setOriginalSearchInput(geoString);
    setSearchResult({ latitude, longitude });
    setInputValue(geoString);
    handleSubmit(new Event('submit'), true);
    setInitialGeoSearchDone(true);
  }, [setInputValue, handleSubmit, setSearchResult, setOriginalSearchInput, initialGeoSearchDone]);

  // Function to handle geolocation error
  const handleGeoError = useCallback((error: GeolocationPositionError) => {
    console.error('Geolocation error:', error);
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
