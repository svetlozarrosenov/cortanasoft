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
          Home
        </Link>
      </li>
       <li className={styles.headerNavLink}>
          <Link href="/about">
            About Us
          </Link>
      </li>
       <li className={styles.headerNavLink}>
        <Link href="/contacts">
          Contact Us
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;