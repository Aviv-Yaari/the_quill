import PrimaryButton from "@/components/shared/PrimaryButton";
import axios from "axios";

const LoginPage = () => {
  const handleLogin = async () => {
    const token = axios.post("/api/auth/login", { username: 'aviv', password: 1234 })
      .then(() => { axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; })
      .catch(() => console.log('bad login'));
  };
  return (
    <div>
      <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
    </div>
  );
};

export default LoginPage;