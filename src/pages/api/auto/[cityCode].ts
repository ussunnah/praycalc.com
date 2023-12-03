// src/pages/api/auto/[cityCode].ts
import { NextApiRequest, NextApiResponse } from 'next';
import rawData from '../../../../data/auto.json';

interface AutoDataItem {
  i?: string | number; // ID (Airport IATA code or Zipcode)
  n: string; // Name
  p?: number; // Population (only for cities)
}

const autoData: AutoDataItem[] = rawData as AutoDataItem[];

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { cityCode } = req.query;

  if (!cityCode || typeof cityCode !== 'string') {
    // Return early if no city code is provided or if the city code is not a string
    res.status(200).json([]);
  } else {
    const results = autoData.filter((item: AutoDataItem) => {
      const name = item.n.toLowerCase();
      const iataCodeOrZip = item.i?.toString().toLowerCase() ?? '';
      return name.startsWith(cityCode.toLowerCase()) || iataCodeOrZip.startsWith(cityCode.toLowerCase());
    });

    // Sort the results by population (if available) and limit to 10 results
    const sortedResults = results.sort((a, b) => (b.p || 0) - (a.p || 0)).slice(0, 10);

    // Map to the required response structure
    const response = sortedResults.map(result => ({
      city_name: result.n,
      // Additional fields can be added here based on the requirement
    }));

    // Return a 200 status with the filtered data
    res.status(200).json(response);
  }
};

export default handler;
