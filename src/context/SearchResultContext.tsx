// src/context/SearchResultContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context data including the original search input
interface SearchResultContextData {
  searchResult: any; // Replace 'any' with the correct type of your search result
  originalSearchInput: string | null; // Field to store the original search input
  setSearchResult: (result: any) => void; // Replace 'any' with the correct type of your search result
  setOriginalSearchInput: (input: string | null) => void; // Setter for the original search input
}

// Create the context with a default value
const SearchResultContext = createContext<SearchResultContextData | null>(null);

// Define the props for the provider component
interface SearchResultProviderProps {
  children: ReactNode;
}

export const SearchResultProvider: React.FC<SearchResultProviderProps> = ({ children }) => {
  const [searchResult, setSearchResult] = useState<any>(null); // Replace 'any' with the correct type
  const [originalSearchInput, setOriginalSearchInput] = useState<string | null>(null);

  return (
    <SearchResultContext.Provider value={{ searchResult, setSearchResult, originalSearchInput, setOriginalSearchInput }}>
      {children}
    </SearchResultContext.Provider>
  );
};

// Hook to use the search result context
export const useSearchResult = () => {
  const context = useContext(SearchResultContext);
  if (!context) {
    throw new Error('useSearchResult must be used within a SearchResultProvider');
  }
  return context;
};

