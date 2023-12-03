// src/pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';
import { SearchProvider } from '../context/SearchContext';
import { SearchResultProvider } from '../context/SearchResultContext';
import { CityProvider } from '../context/CityContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { hideFooter = false } = pageProps;

  return (
    <SearchProvider>
      <SearchResultProvider>
        <CityProvider>
          <Head>
            <title>PrayCalc</title>
            <meta name="description" content="Next Generation Prayer Times Calculator" />
          </Head>
          <Layout hideFooter={hideFooter}>
            <Component {...pageProps} />
          </Layout>
        </CityProvider>
      </SearchResultProvider>
    </SearchProvider>
  );
}

export default MyApp;
