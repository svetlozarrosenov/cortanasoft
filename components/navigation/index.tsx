import React from 'react';
import Link from 'next/link';
import styles from './nav.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Начало</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about">За нас</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contacts">Контакти</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/login">Влизане</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;