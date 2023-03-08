import PrimaryButton from "@/components/shared/PrimaryButton";
import { useAppDispatch } from "@/store";
import { raiseError } from "@/store/slices/app.slice";
import { login } from "@/store/slices/user.thunks";
import { useRouter } from "next/router";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    dispatch(login({ username: 'aviv', password: '1234' })).unwrap()
      .then(() => router.back())
      .catch(() => dispatch(raiseError('Could not login')));
  };
  return (
    <div>
      <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
    </div>
  );
};

export default LoginPage;