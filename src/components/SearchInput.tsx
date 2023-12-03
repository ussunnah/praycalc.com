// src/components/SearchInput.tsx
import React, { forwardRef } from 'react';
import Image from 'next/image';
import styles from '../styles/Search.module.css';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  disabled: boolean;
}

// The forwardRef allows the parent component to get a reference to the underlying input element.
const SearchInput: React.FC<SearchInputProps & { ref: React.Ref<HTMLInputElement> }> = forwardRef(
  ({ value, onChange, onSubmit, placeholder, disabled }, ref) => {
    return (
      <form onSubmit={onSubmit} className={styles.searchForm}>
        <input
          ref={ref}
          type="text"
          className={`${styles.searchInput} ${disabled ? styles.disabled : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
          disabled={disabled}
          autoFocus
        />
        <button type="submit" className={styles.searchButton} disabled={disabled}>
          <Image src="/search.svg" alt="Search" width={32} height={32} priority={true} />
        </button>
      </form>
    );
  }
);

SearchInput.displayName = 'SearchInput'; // This is to provide a more useful component stack trace in the dev tools.

export default SearchInput;
