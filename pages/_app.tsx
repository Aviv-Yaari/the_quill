import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import type { AppProps } from 'next/app';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import { breakpoints } from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </>
  );
}

const MainLayout = styled.main`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  >:first-child {
    margin-inline: 1em;
    width: 100%;
    max-width: ${breakpoints.desktopBreakpoint};
  }
`;