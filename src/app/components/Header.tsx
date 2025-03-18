'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => {
    setIsNavVisible(!isNavVisible);
  };

  const hideNavbar = () => {
    setIsNavVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        hideNavbar();
      }
    };

    if (isNavVisible) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNavVisible]);

  return (
    <header className={styles.header}>
      {/* <Navbar /> Include the Navbar component */}
      <div className={styles.logoContainer}>
        <Link href="/" legacyBehavior>
          <a>
            <Image src="/logo.png" alt="Helping Bots Logo" className={styles.logo} width={50} height={50} />
          </a>
        </Link>
      </div>
      <button className={styles.navbarToggle} onClick={toggleNavbar}>&#9776;</button>
      <nav ref={navRef} className={`${styles.nav} ${isNavVisible ? styles.navVisible : ''}`}>
        <ul className={styles.navList} onClick={hideNavbar}>
          <li className={styles.navItem}><a href="#features" className={styles.navLink}>Features</a></li>
          <li className={styles.navItem}>
            <Link href="/about" legacyBehavior>
              <a className={styles.navLink}>About Us</a>
            </Link>
          </li>
          <li className={styles.navItem}><a href="#pricing" className={styles.navLink}>Pricing</a></li>
          <li className={styles.navItem}><a href="#contact" className={styles.navLink}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;