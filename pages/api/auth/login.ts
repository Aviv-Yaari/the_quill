import { NextApiRequest, NextApiResponse } from "next";
import handleError from "@/middleware/handleError";
import { authService } from "@/services/auth.service";
import cookie from 'cookie';

async function _login(req: NextApiRequest, res: NextApiResponse) {
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

export default handleError(_login);