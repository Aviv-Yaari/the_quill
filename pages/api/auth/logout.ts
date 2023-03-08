import { NextApiRequest, NextApiResponse } from "next";
import handleError from "@/middleware/handleError";
import cookie from 'cookie';

async function _logout(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/'
  }));
  
  res.status(200).send('Logged out successfully');
}
  
export default handleError(_logout);
  