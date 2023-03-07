import { authService } from "@/services/auth.service";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';

export default function verify(req: NextApiRequest, res: NextApiResponse) {
  const { token } = cookie.parse(req.headers.cookie || '');
  if (!token) {
    return res.status(400).end("No token in cookies");
  }
  const user = authService.verifyToken(token);
  res.send(user);
}