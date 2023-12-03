// src/components/SearchAuto.tsx
import React from 'react';
import styles from '../styles/Search.module.css';

interface AutocompleteResult {
  city_name: string;
}

interface AutocompleteProps {
  results: AutocompleteResult[];
  onSelect: (cityName: string) => void;
}

const SearchAuto: React.FC<AutocompleteProps> = ({ results, onSelect }) => {
  return (
    <ul className={styles.autocompleteResults}>
      {results.map((result, index) => (
        <li key={index} className={styles.autocompleteItem} onClick={() => onSelect(result.city_name)}>
          {result.city_name}
        </li>
      ))}
    </ul>
  );
};

export default SearchAuto;
