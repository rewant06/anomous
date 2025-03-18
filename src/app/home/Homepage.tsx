import React from 'react';
import Head from 'next/head';
import styles from '../styles/HomePage.module.css'; // Assuming you have a CSS module for HomePage

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Secrets - Share Anonymously</title>
        <meta name="description" content="Don't keep your secrets, share them anonymously!" />
      </Head>
     
      <div className={`jumbotron centered ${styles.jumbotron}`}>
        <div className="container">
          <i className="fas fa-key fa-6x"></i>
          <h1 className="display-3">Secrets</h1>
          <p className="lead">Dont keep your secrets, share them anonymously!</p>
          <hr />
          <a className="btn btn-light btn-lg" href="/register" role="button">Register</a>
          <a className="btn btn-dark btn-lg" href="/login" role="button">Login</a>
        </div>
      </div>
    </>
  );
};

export default HomePage;