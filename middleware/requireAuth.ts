import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { GetServerSidePropsContext, NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

export default function requireAuth(handler: NextApiHandler) {
  console.log('Checking auth for', handler.name);
  return (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = cookie.parse(req.headers.cookie || '');
    if (!token) {
      return res.status(401).end('Unauthorized');
    };
    const user = jwt.verify(token, process.env.JWT_SECRET || '');
    if (!user) {
      return res.status(401).end('Unauthorized');
    };
    return NextResponse.next();
  };
}

// TODO: see if i can use the "GetServerSideProps" type for the argument
export function requireAuthForGetServerSideProps(getServerSideProps: Function) {
  return (context: GetServerSidePropsContext) => {
    const { token } = cookie.parse(context.req.headers.cookie || '');
    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        },
      };
    };
    const user = jwt.verify(token, process.env.JWT_SECRET || '');
    return getServerSideProps(context, user);
  };
}