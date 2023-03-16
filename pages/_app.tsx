import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from '@/store';
import { Provider } from 'react-redux';
import AppRouterListener from '@/components/AppRouterListener';
import RootComponent from './RootComponent';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={() => <div>An unexpected error occured</div>}>
          <AppRouterListener>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <RootComponent>
                <Component {...pageProps} />
              </RootComponent>
            </ThemeProvider>
          </AppRouterListener>
        </ErrorBoundary>
      </Provider>
    </>
  );
}