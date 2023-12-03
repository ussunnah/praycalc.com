// src/pages/api/spa/[[...params]].ts
import { NextApiRequest, NextApiResponse } from 'next';
import spa from 'solar-spa';

// Define default values for optional parameters
const defaultElevation = '0';
const defaultTemperature = '20';
const defaultPressure = '1013.25';
const defaultRefraction = '0.5667';

// Define the API route handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract the dynamic route segments from the request query object
    const { params } = req.query;

    // Type guard to ensure params is an array of strings
    if (!Array.isArray(params)) {
      res.status(400).json({ error: 'Invalid parameters.' });
      return;
    }

    // Destructure the params array
    const [
      dateStr,
      latitude,
      longitude,
      elevation = defaultElevation,
      temperature = defaultTemperature,
      pressure = defaultPressure,
      refraction = defaultRefraction
    ] = params;

    // Convert the date string (YYYYMMDD) to a Date object in local time
    const parsedDate = new Date(
      `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}T00:00:00`
    );

    // Convert strings to numbers
    const numLatitude = parseFloat(latitude);
    const numLongitude = parseFloat(longitude);
    const numElevation = parseFloat(elevation);
    const numTemperature = parseFloat(temperature);
    const numPressure = parseFloat(pressure);
    const numRefraction = parseFloat(refraction);

    // Perform the calculations using the "solar-spa" module
    const result = await spa(
      parsedDate,
      numLatitude,
      numLongitude,
      numElevation,
      numTemperature,
      numPressure,
      numRefraction
    );

    // Log the result for debugging
    console.log("SPA Calculation Result:", result);

    // Send the result back to the client
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while performing the calculation.' });
  }
}
