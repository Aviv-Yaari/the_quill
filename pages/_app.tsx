import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import type { AppProps } from 'next/app';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import { breakpoints } from '@/styles/theme';
import Navbar from '@/components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainContent>
          <div>
            <Navbar />
            <Component {...pageProps} />
          </div>
        </MainContent>
      </ThemeProvider>
    </>
  );
}

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  >:first-child {
    max-width: ${breakpoints.desktopBreakpoint};
    width: 100%;
  }
`;