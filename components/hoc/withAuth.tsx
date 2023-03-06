import cookie from 'cookie';
import { useRouter } from 'next/router';

/**
 * This is a HOC that will redirect to login if there is no user logged in
 */

const withAuth = (Component: any) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const router = useRouter();
    const { jwt } = cookie.parse(document.cookie || '');
    if (jwt) {
      return <Component {...props} />;
    }
    router.replace('/login');
    return <></>;
  };

  return AuthenticatedComponent;
};

export default withAuth;