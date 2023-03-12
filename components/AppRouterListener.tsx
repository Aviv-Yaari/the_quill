import { useAppDispatch } from "@/store";
import { Router } from "next/router";
import { ReactNode, useEffect } from "react";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

interface Props {
    children: ReactNode;
}

const AppRoterListener = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      NProgress.start();
    };
    
    const handleRouteChangeEnd = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeEnd);
    Router.events.on('routeChangeError', handleRouteChangeEnd);
    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeEnd);
      Router.events.off('routeChangeError', handleRouteChangeEnd);
    }; 
  }, [dispatch]);

  return <>{children}</>;
};

export default AppRoterListener;