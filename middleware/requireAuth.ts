import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { GetServerSidePropsContext, NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { UserToken } from '@/types/User';
import { authService } from '@/services/auth.service';


// TODO: maybe should use jwt header instead of cookie.
export default function requireAuth(handler: NextApiHandler) {
  console.log('Checking auth for', handler.name);
  return (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = cookie.parse(req.headers.cookie || '');
    if (!token) {
      return res.status(401).end('Unauthorized');
    };
    const user = jwt.verify(token, process.env.JWT_SECRET || '') as UserToken;
    if (!user?.id) {
      return res.status(401).end('Unauthorized');
    };
    req.user = user; // attach the user object to the request
    return handler(req, res);
  };
}

// TODO: see if i can use the "GetServerSideProps" type for the argument
export function requireAuthForGetServerSideProps(getServerSideProps: Function, redirect = false) {
  return (context: GetServerSidePropsContext) => {
    const { token } = cookie.parse(context.req.headers.cookie || '');
    const user = authService.verifyToken(token);
    if (!user && redirect) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        },
      };
    };
    return getServerSideProps(context, user);
  };
}