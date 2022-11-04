import '@src/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import Analytics from '@src/components/analytics';
import { ModalContainer } from '@src/components/container';
import siteMetadata from '@src/core/config/siteMetadata';
import { customAxios, useAxiosEnvironment } from '@src/core/lib/customAxios';
import { getAuthToken } from '@src/utils/authUtil';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

customAxios().defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;

const App: NextPage = ({ Component, pageProps, router }: AppProps) => {
  useAxiosEnvironment();

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
