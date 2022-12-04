import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../material-ui-configs/createEmotionCache';
import { Provider } from "react-redux";
import { store } from '../store';
import { ColorModeContext, useMode } from '../material-ui-configs/theme';
import Layout from '../components/Layout/Default';
import '../styles/globals.scss';
import Snackbar from '../components/Global/Snackbar'
import { UserProvider } from '@auth0/nextjs-auth0/client';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const myApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [theme, colorMode]= useMode();
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
<<<<<<< HEAD
=======
       
      
      
      <ProSidebarProvider>
>>>>>>> 0dfc8b0 (Auth0 for user login)
        <Provider store={store}>
        <UserProvider>
         <Component {...pageProps} />
        <UserProvider>
         <Component {...pageProps} />
          <CacheProvider value={emotionCache}>
         
         
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline enableColorScheme />
                  <Snackbar />
                  {/* <UserProvider>
                    <Component {...pageProps} />
                    
                  </UserProvider> */}
                  {/* <UserProvider>
                    <Component {...pageProps} />
                    
                  </UserProvider> */}
                  { getLayout(<Component {...pageProps} />) }
              </ThemeProvider>
            </ColorModeContext.Provider>
          </CacheProvider>
          </UserProvider>
          </UserProvider>
        </Provider>
<<<<<<< HEAD
=======
      </ProSidebarProvider>
   
>>>>>>> 0dfc8b0 (Auth0 for user login)
  );
}

export default myApp;