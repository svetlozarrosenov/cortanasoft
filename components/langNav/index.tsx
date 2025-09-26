import React from 'react';
import Link from 'next/link';
import styles from './lang-nav.module.css';

const LangNav: React.FC = () => {
  return (
    <ul className={styles['lang-nav']}>
      <li className={styles['lang-nav__item']}>
        <Link href="/en">EN</Link>
      </li>
      <li className={styles['lang-nav__item']}>
        <Link href="/bg">BG</Link>
      </li>
    </ul>
  );
};

export default LangNav;