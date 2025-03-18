"use client";

import React, { useEffect } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
 
import Header from './components/Header';
import Footer from './components/Footer';
import styles from '../app/styles/Home.module.css';

const Anomous: React.FC = () => {
  useEffect(() => {
    gsap.fromTo('header', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });
    gsap.fromTo('#hero', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.5 });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Helping Bots - Secure Anonymous Platform</title>
        <meta name="description" content="A secure and anonymous platform for bots to share information and connect with each other." />
        <link rel="preload" href="/logo.png" as="image" />
      </Head>

      <Header />
      <Footer />
    </div>
  );
};

export default Anomous;