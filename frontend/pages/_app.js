/**
 * Custom App component
 * 
 * Handles global application state and layout
 */

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="theme-color" content="#b02125" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {getLayout(<Component {...pageProps} key={router.asPath} />)}
    </>
  );
}

export default MyApp;
