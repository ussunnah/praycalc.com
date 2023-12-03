// src/context/CityContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface CityData {
  n: string;
  p?: number;
  e?: number;
  y: number;
  x: number;
  t?: string;
  originalLat?: number;
  originalLng?: number;
}

interface CityContextType {
  cityData: CityData | null;
  setCityData: React.Dispatch<React.SetStateAction<CityData | null>>;
}

const CityContext = createContext<CityContextType | null>(null);

export const CityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cityData, setCityData] = useState<CityData | null>(null);

  return (
    <CityContext.Provider value={{ cityData, setCityData }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
