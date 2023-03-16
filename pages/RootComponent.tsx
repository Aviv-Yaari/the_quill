import AppError from "@/components/AppError";
import Navbar from "@/components/Navbar";
import { useAppDispatch } from "@/store";
import { verifyUserFromToken } from "@/store/slices/user.thunks";
import { AppWrapper } from "@/styles/helpers";
import { useEffect } from "react";


const RootComponent = ({ children }: {children: JSX.Element}) => {
  const dispatch = useAppDispatch();
    
  useEffect(() => {
    dispatch(verifyUserFromToken()).unwrap().catch(() => console.info('not logged in'));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <AppWrapper>
        {children}
        <AppError />
      </AppWrapper>
    </>
  );
};

export default RootComponent;