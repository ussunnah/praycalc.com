// src/hooks/useCurrentTime.ts
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const useCurrentTime = (testing: boolean = false) => {
  const [currentTime, setCurrentTime] = useState(DateTime.local());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prevTime => {
        return testing ? prevTime.plus({ hours: 1 }) : DateTime.local();
      });
    }, 100);

    return () => clearInterval(timer);
  }, [testing]);

  return currentTime;
};

export default useCurrentTime;
