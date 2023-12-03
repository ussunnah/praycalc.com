// src/hooks/useSearchLogo.ts
import { useState, useEffect } from 'react';

export const useSearchLogo = () => {
  const [logoPosition, setLogoPosition] = useState('logoStart');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoPosition('logoEnd');
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return logoPosition;
};
