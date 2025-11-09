'use client';
import React from 'react';
import Link from 'next/link';
import { useUser } from '@/app/login/hooks';
import styles from './nav.module.css';

const Navigation: React.FC = () => {
  const { user } = useUser();

  return (
    <ul className={styles.headerNav}>
      <li className={styles.headerNavLink}>
        <Link href="/dashboard">
          Дашборд
        </Link>
      </li>
      <li className={styles.headerNavLink}>
        <Link href="/">
          Начало
        </Link>
      </li>
       <li className={styles.headerNavLink}>
          <Link href="/about">
            За Нас
          </Link>
      </li>
       <li className={styles.headerNavLink}>
        <Link href="/contacts">
          Контакти
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;