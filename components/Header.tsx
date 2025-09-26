import React from 'react';
import Navigation from './navigation';
import Link from 'next/link';
import styles from './header.module.css';
import Shell from './shell';
import LangNav from './langNav';
import Button from './button';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Shell>
        <div className={styles.headerInner}>
          <div className='logo'>
            <Link href="/">
              CortanaSoft ERP
            </Link>
          </div>
          <Navigation />

          <div className={styles.headerInnerSecondary}>
            <LangNav/>
            <Button>Sign In</Button>
          </div>
        </div>
      </Shell>
    </header>
  );
};

export default Header;