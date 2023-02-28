import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import Navbar from '@/components/Navbar';
import { AppLayout } from '@/styles/helpers';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from '@/store';
import { Provider } from 'react-redux';
import AppError from '@/components/AppError';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={() => <div>An unexpected error occured</div>}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Navbar />
          <AppLayout>
            <Component {...pageProps} />
            <AppError />
          </AppLayout>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}