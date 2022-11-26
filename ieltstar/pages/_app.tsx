import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../material-ui-configs/createEmotionCache';
import { Provider } from "react-redux";
import { store } from '../store';
import { ColorModeContext, useMode } from '../material-ui-configs/theme';
import { ProSidebarProvider } from 'react-pro-sidebar';
import '../styles/globals.scss';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const myApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [theme, colorMode]= useMode();

  return (
      <ProSidebarProvider>
        <Provider store={store}>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline enableColorScheme />
                  <Component {...pageProps} />
              </ThemeProvider>
            </ColorModeContext.Provider>
          </CacheProvider>
        </Provider>
      </ProSidebarProvider>
  );
}

export default myApp;