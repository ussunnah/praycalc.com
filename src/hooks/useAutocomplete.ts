// src/hooks/useAutocomplete.ts
import { useState, useEffect } from 'react';
import { AutocompleteResult } from '../types/autocomplete';

export const useAutocomplete = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [autocompleteResults, setAutocompleteResults] = useState<AutocompleteResult[]>([]);
  const [searchError, setSearchError] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmedValue = inputValue.trim();
      if (trimmedValue === '') {
        setAutocompleteResults([]);
        setSearchError('');
      } else {
        performSearch(trimmedValue);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const performSearch = async (searchTerm: string) => {
    try {
      const response = await fetch(`/api/auto/${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch autocomplete results.');
      }
      const data = await response.json();
      setAutocompleteResults(data);
      setSearchError('');
    } catch (error) {
      console.error(error);
      setSearchError('An unexpected error occurred.');
    }
  };

  return {
    inputValue,
    setInputValue,
    autocompleteResults,
    searchError,
    setSearchError,
  };
};
