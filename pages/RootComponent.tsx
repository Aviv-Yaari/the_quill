import AppError from "@/components/AppError";
import Navbar from "@/components/Navbar";
import { AppWrapper } from "@/styles/helpers";
import axios from "axios";
import { useEffect, useState } from "react";


const RootComponent = ({ children }: {children: JSX.Element}) => {
  const [username, setUsername] = useState('Guest');
    
  useEffect(() => {
    axios.post("/api/auth/verify")
      .then(res => setUsername(res.data))
      .catch(() => console.log('bad user'));
  }, []);

  return (
    <>
      <Navbar username={username} />
      <AppWrapper>
        {children}
        <AppError />
      </AppWrapper>
    </>
  );
};

export default RootComponent;