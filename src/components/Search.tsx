// src/components/Search.tsx
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import SearchInput from './SearchInput';
import { useSearchLogo } from '../hooks/useSearchLogo';
import { useSearchHandler } from '../hooks/useSearchHandler';
import styles from '../styles/Search.module.css';

const Search = () => {
  const {
    isSearching,
    handleInputChange,
    handleSubmit,
    inputValue,
    searchError,
    setInputValue,
    autocompleteResults,
  } = useSearchHandler();

  const logoPosition = useSearchLogo();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.searchContainer}>
      <div className={`${styles.logo} ${styles[logoPosition]}`}>
        <Image src="/logo.svg" alt="Logo" width={200} height={136} priority={true} />
      </div>
      <div className={`${styles.searchBox} ${isSearching ? styles.searchBoxDisabled : ''}`}>
        <SearchInput
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          placeholder={isSearching ? 'Searching...' : searchError || 'Enter a city or airport code...'}
          disabled={isSearching}
        />
      </div>
      {!isSearching && autocompleteResults.length > 0 && (
        <ul className={styles.autocompleteResults}>
          {autocompleteResults.map((result, index) => (
            <li key={index} className={styles.autocompleteItem} onClick={() => setInputValue(result.city_name)}>
              {result.city_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
