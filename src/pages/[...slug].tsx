// src/pages/[...slug].tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import City from '../components/City';
import { validateResultWithAPI } from '../utils/validateResult';
import { useCity } from '../context/CityContext';
import { useSearchResult } from '../context/SearchResultContext';

const CityPage: React.FC = () => {
  const { setCityData } = useCity();
  const { searchResult, setSearchResult, originalSearchInput } = useSearchResult();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const slug = router.query.slug;
    const slugArray = Array.isArray(slug) ? slug : slug ? [slug] : [];
    if (slugArray.length === 0) {
      console.log('Redirecting to home because slug is empty');
      router.replace('/');
      return;
    }

    let type = 'unknown';
    const airportPattern = /^[a-zA-Z]{3}$/;
    const usZipcodePattern = /^[0-9]{5}$/;
    const isPossibleAirport = airportPattern.test(slugArray[0]);

    if (isPossibleAirport && slugArray.length === 1) {
      type = 'airport';
    } else if (slugArray.length === 2) {
      type = 'non-us-city';
    } else if (slugArray.length === 3) {
      if (slugArray[0] === 'us' && usZipcodePattern.test(slugArray[2])) {
        type = 'us-zipcode';
      } else if (slugArray[0] === 'us') {
        type = 'us-city';
      }
    }

    // Determine if it's a fresh navigation
    const freshNavigation = !searchResult || type !== searchResult.type;

    // If originalInput has coords but not yet added to searchResult
    const coordinatesPattern = /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/;
    if (!searchResult?.originalLat && !searchResult?.originalLng && originalSearchInput && coordinatesPattern.test(originalSearchInput)) {
      const [originalLat, originalLng] = originalSearchInput.split(',').map(coord => parseFloat(coord.trim()));
      const updatedSearchResult = {
        ...searchResult,
        originalLat,
        originalLng
      };
      setSearchResult(updatedSearchResult);
    }

    validateResultWithAPI(slugArray, type, freshNavigation, searchResult)
      .then((validData) => {
        if (!validData) {
          router.replace('/');
          return;
        }
        setCityData(validData);
        // Clear search result if it's a fresh navigation
        //if (freshNavigation) setSearchResult(null);
      })
      .catch((error) => {
        console.error('Validation failed with error:', error);
        router.replace('/');
      });
  }, [router, setCityData, setSearchResult, searchResult, originalSearchInput]);

  return (
    <div className="pt-20">
      <City />
    </div>
  );
};

export default CityPage;
