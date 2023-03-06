import cookie from 'cookie';
import { GetServerSidePropsContext, NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

export default function requireAuth(handler: NextApiHandler) {
  console.log('Checking auth for', handler.name);
  return (req: NextApiRequest, res: NextApiResponse) => {
    const { jwt } = cookie.parse(req.headers.cookie || '');
    if (!jwt) {
      return res.status(401).end('Unauthorized');
    };
    return NextResponse.next();
  };
}

export function requireAuthForGetServerSideProps(getServerSideProps: Function) {
  return (context: GetServerSidePropsContext) => {
    const { jwt } = cookie.parse(context.req.headers.cookie || '');
    if (!jwt) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    };
    return getServerSideProps(context, jwt);
  };
}