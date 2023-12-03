// src/hooks/useSearchFormat.ts
interface SearchResult {
  i?: string;
  n: string;
}

export const useSearchFormat = (result: SearchResult): string => {
  const formatSegment = (segment: string) => {
    // Remove leading and trailing hyphens and spaces, replace spaces with hyphens
    return segment.replace(/^-+|-+$|^\s+|\s+$/g, '').replace(/\s+/g, '-').toLowerCase();
  };

  const formatCityName = (city: string) => {
    // Remove any trailing hyphens
    return city.replace(/-+$/, '');
  };

  const formatPath = () => {
    if (result.i && result.i.length === 3) {
      // Airport code
      return `/${formatSegment(result.i)}`;
    } else if (result.i && result.i.length === 5) {
      // US Zip code
      return `/us/${formatSegment(result.i)}`;
    } else if (result.n) {
      // City name
      const parts = result.n.split(',').map(part => formatSegment(part));
      const city = formatCityName(parts[0]);
      if (parts.length === 3) {
        // US City
        const state = parts[1];
        return `/us/${state}/${city}`;
      } else {
        // Non-US City
        const country = parts[1];
        return `/${country}/${city}`;
      }
    }
    throw new Error('Invalid result format');
  };

  return formatPath();
};
