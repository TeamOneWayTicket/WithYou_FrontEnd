import '@src/styles/globals.css';

import Analytics from '@src/components/analytics';
import { ModalContainer } from '@src/components/container';
import { envConfig } from '@src/core/config/envConfig';
import siteMetadata from '@src/core/config/siteMetadata';
import { getAuthToken } from '@src/utils/authUtil';
import axios from 'axios';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import qs from 'qs';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = envConfig.apiUrl;
axios.defaults.headers.common['Authorization'] = getAuthToken();
axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};

const App: NextPage = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Head>
        <title>{siteMetadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      </Head>
      <Analytics />
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <RecoilRoot>
          <Component {...pageProps} key={router.route} />
          <ModalContainer />
        </RecoilRoot>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
};

export default App;
