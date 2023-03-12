import PrimaryButton from "@/components/shared/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/store";
import { raiseError } from "@/store/slices/app.slice";
import { selectIsLoading } from "@/store/slices/user.slice";
import { login } from "@/store/slices/user.thunks";
import { GridLayout } from "@/styles/helpers";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEventHandler } from "react";
import styled from "styled-components";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading = useAppSelector(selectIsLoading);

  const handleLogin: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    if (!(ev.target instanceof HTMLFormElement)) return;
    const formData = new FormData(ev.target);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    if (!username || !password) {
      dispatch(raiseError('Username or password is empty'));
      return;
    }
    dispatch(login({ username, password })).unwrap()
      .then(() => router.back())
      .catch(() => dispatch(raiseError('Could not login')));
  };

  return (
    <>
      <Head><title>The Quill - Login</title></Head>
      <GridLayout>
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <InputAndLabel>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" />
          </InputAndLabel>
          <InputAndLabel>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </InputAndLabel>
          <PrimaryButton isBusy={isLoading}>Login</PrimaryButton>
        </Form>
      </GridLayout>
    </>
  );
};

const Form = styled.form`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 400px;
`;

const InputAndLabel = styled.div`
  display: flex;
  flex-direction: column;
`;

export default LoginPage;