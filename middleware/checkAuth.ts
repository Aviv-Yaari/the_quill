import cookie from 'cookie';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

export default function checkAuth(handler: NextApiHandler) {
  console.log('Checking auth for', handler.name);
  return (req: NextApiRequest, res: NextApiResponse) => {
    const { jwt } = cookie.parse(req.headers.cookie || '');
    if (!jwt) {
      return res.status(401).end('Unauthorized');
    };
    return NextResponse.next();
  };
}