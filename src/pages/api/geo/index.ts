// pages/api/geo/index.ts
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(400).json({ error: `Syntax is "/api/geo/[city]" or "/api/geo/[latitude,longitude]"` });
};

export default handler;
