import { useAppDispatch } from "@/store";
import { routeChangeEnd, routeChangeStart } from "@/store/slices/app.slice";
import { Router } from "next/router";
import { ReactNode, useEffect } from "react";

interface Props {
    children: ReactNode;
}

const AppRoterListener = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleRouteChangeStart = () => dispatch(routeChangeStart());
    const handleRouteChangeEnd = () => dispatch(routeChangeEnd());

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