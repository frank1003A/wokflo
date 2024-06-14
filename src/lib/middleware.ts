/**import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function authMiddleware(req:NextApiRequest, res:NextApiResponse, next) {
  const token = await getToken({ req, secret });
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req..user = token;
  next();
} */
export {};
