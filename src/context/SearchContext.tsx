// src/context/SearchContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { SearchResultType } from '../types/search';

interface ISearchContext {
  searchResult: SearchResultType | null;
  setSearchResult: (result: SearchResultType | null) => void;
}

const SearchContext = createContext<ISearchContext | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchResult, setSearchResult] = useState<SearchResultType | null>(null);

  return (
    <SearchContext.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </SearchContext.Provider>
  );
};
