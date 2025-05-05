/**
 * Layout Component
 * 
 * Main layout wrapper for the application
 */

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { getCurrentUser } from '../lib/supabase';

const Layout = ({ children, title = 'Aamis Fresh Meat Delivery', description = 'Premium fresh meat delivered to your doorstep' }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get current user on mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header user={user} />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
