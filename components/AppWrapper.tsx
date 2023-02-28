import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import { AppLayout } from '@/styles/helpers';
import { resetError, selectError } from '@/store/slices/app.slice';
import { useAppDispatch, useAppSelector } from '@/store';
import Toast from '@/components/shared/Toast';

export default function AppWrapper({ Component, pageProps }: AppProps) {
  const appError = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const resetAppError = () => {
    dispatch(resetError());
  };
  return (
    <>
      <Navbar />
      <AppLayout>
        <Component {...pageProps} />
        {appError && <Toast onClose={resetAppError}>Error!!</Toast>}
      </AppLayout>
    </>
  );
}