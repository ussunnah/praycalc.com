// src/types/search.ts
export interface AutocompleteResult {
    city_name: string;
  }
  
  export interface SearchResult {
    i?: string;
    n: string;
  }

  export interface SearchResultType {
    i?: string; // ID (Airport IATA code or Zipcode)
    n: string;  // Name
    e: number;  // Elevation
    y: number;  // Latitude
    x: number;  // Longitude
    t: string;  // Timezone
    latLngProvided?: boolean;
  }
  
  export interface SearchContextProps {
    searchResult: SearchResultType | null;
    setSearchResult: (result: SearchResultType | null) => void;
  }
  