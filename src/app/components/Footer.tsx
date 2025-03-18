import React from 'react';
import styles from '../styles/Footer.module.css'; // Assuming you have a CSS module for Footer

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {/* Footer content goes here */}
      <p>© 2025 Helping Bots. All rights reserved.</p>
    </footer>
  );
};

export default Footer;