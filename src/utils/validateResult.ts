// src/utils/validateResult.ts
export interface ValidData {
  n: string;        // The name of the city or airport
  p?: number;       // Population
  e?: number;       // Elevation
  y: number;        // Latitude
  x: number;        // Longitude
  t?: string;       // Timezone
  i?: string;       // IATA code for airports
  originalLat?: number;
  originalLng?: number;
  type?: string;    // Added to distinguish between city and airport
}

export async function validateResultWithAPI(slug: string[], type: string, freshNavigation: boolean, searchResult?: any): Promise<ValidData | null> {
  if (searchResult !== null && freshNavigation) {  
      const searchData: ValidData = {
        ...searchResult,
        type, // Store the type to use for future validations
      };
      return searchData;
  }

  let apiEndpoint = '';
  switch (type) {
    case 'airport':
      apiEndpoint = `/api/geo/${slug[0]}`;
      break;
    case 'us-zipcode':
      apiEndpoint = `/api/geo/${slug[1]}`;
      break;
    case 'us-city':
      apiEndpoint = `/api/geo/${encodeURIComponent(`${slug[2]}, ${slug[1]}, US`)}`;
      break;
    case 'non-us-city':
      apiEndpoint = `/api/geo/${encodeURIComponent(`${slug[1]}, ${slug[0]}`)}`;
      break;
    case 'city':
      apiEndpoint = `/api/geo/${encodeURIComponent(slug.join(' '))}`;
      break;
    default:
      return null; // Type is unknown, so return null without making an API call.
  }

  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      console.error('API call failed:', response.statusText);
      return null;
    }
    const data = await response.json();

    if (type === 'airport' && !data.i) {
      //console.log('The slug is treated as an airport code but did not match an airport in the API.');
      return null;
    }

    const resultData: ValidData = {
      ...data,
      type, // Store the type to use for future validations
    };

    return resultData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
