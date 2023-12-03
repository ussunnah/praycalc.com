// pages/api/omw/index.ts
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(400).json({ error: `Syntax is "/api/omw/[lat]/[lng]"` });
};

export default handler;
