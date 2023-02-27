import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import Navbar from '@/components/Navbar';
import { AppLayout } from '@/styles/helpers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </>
  );
}