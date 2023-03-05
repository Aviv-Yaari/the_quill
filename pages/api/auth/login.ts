import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body;
  if (!username) {
    res.status(400).end('Missing username');
  }

  res.setHeader('Set-Cookie', cookie.serialize('jwt', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // Set cookie expiration time in seconds
    path: '/', // Set cookie path
  }));

  res.send("Logged in");
}