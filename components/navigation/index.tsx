'use client'
import React from 'react';
import Link from 'next/link';
import styles from './nav.module.css';
import { useUser } from '@/app/login/hooks';

const Navigation: React.FC = () => {
  const { user } = useUser();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {user && <li className={styles.navItem}>
          <Link href="/dashboard">Дашборд</Link>
        </li>}
        {!user && <li className={styles.navItem}>
          <Link href="/">Начало</Link>
        </li>}
        <li className={styles.navItem}>
          <Link href="/about">За нас</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contacts">Контакти</Link>
        </li>
        {!user && <li className={styles.navItem}>
          <Link href="/login">Влизане</Link>
        </li>}

        {user && <li className={styles.navItem}>
          Здравейте {user.firstName}
        </li>}
      </ul>
    </nav>
  );
};

export default Navigation;