// src/pages/api/ip/[ipAddress].ts
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

const ipFilesFolder = path.join(process.cwd(), 'data');

interface IpDataItem {
  a: number; // IP Range Start (from)
  b: number; // IP Range End (to)
  n: string; // Name
  e: number; // Elevation
  y: number; // Latitude
  x: number; // Longitude
  t: string; // Timezone
}

const isValidIpAddress = (ip: string): boolean => {
  const ipv4Pattern = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
  return ipv4Pattern.test(ip);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { ipAddress },
  } = req;

  if (!ipAddress || typeof ipAddress !== 'string' || !isValidIpAddress(ipAddress)) {
    return res.status(400).json({ error: 'Invalid IP address' });
  }

  const [firstOctet] = ipAddress.split('.').map(Number);
  const chunkIndex = Math.floor(firstOctet / 16);
  const ipFile = path.join(ipFilesFolder, `ip${String(chunkIndex + 1).padStart(2, '0')}.json`);

  if (!fs.existsSync(ipFile)) {
    return res.status(404).json({ error: 'IP data not found' });
  }

  const rawData = await fs.promises.readFile(ipFile, 'utf-8');
  const ipData: IpDataItem[] = JSON.parse(rawData);
  const numericIP = ipAddress.split('.').reduce((acc, octet) => (acc * 256) + parseInt(octet, 10), 0);

  const result = ipData.find((entry: IpDataItem) => numericIP >= entry.a && numericIP <= entry.b);

  if (!result) {
    return res.status(404).json({ error: 'IP data not found' });
  }

  // Map to the required response structure
  const geoData = {
    city_name: result.n,
    latitude: result.y,
    longitude: result.x,
    elevation: result.e,
    timezone: result.t,
  };

  return res.status(200).json(geoData);
}
