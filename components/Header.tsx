'use client';
import React from 'react';
import Navigation from './navigation';
import Link from 'next/link';
import styles from './header.module.css';
import Shell from './shell';
import LangNav from './langNav';
import Button from './button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const Header: React.FC = () => {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard') ?? false;
  
  return (
    <header className={classNames(styles.header, styles.headerDashboard)}>
      <Shell>
        <div className={styles.headerInner}>
          {!isDashboard && (<div className='logo'>
            <Link href="/">
              <Image
                  src="/CortanaSoftLogo.svg"
                  alt="CortanaSoft Logo"
                  width={282}
                  height={100}
                  className={styles.featureImage}
                />
            </Link>
          </div>)}
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