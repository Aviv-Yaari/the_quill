import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import { authService } from "@/services/auth.service";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  const token = authService.login(username, password);
  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // Set cookie expiration time in seconds
    path: '/', // Set cookie path
  }));

  res.send(token);
}