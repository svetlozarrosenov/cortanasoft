'use client';
import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Shell from './shell';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard') ?? false;
  return !isDashboard && (
    <footer className={styles.footer}>
      <Shell>
        <div className={styles.footerInner}>
          <div className={styles.footerHead}>
            <div className={styles.logo}><Link href={'/'}><Image
                  src="/CortanaSoftLogo.svg"
                  alt="CortanaSoft Logo"
                  width={282}
                  height={100}
                  className={styles.featureImage}
                /></Link></div>

            <ul className={styles.footerNav}>
              <li>
                <Link href="/privacy">
                  Политика за поверителност
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  Условия за ползване
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  Контакти
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerFoot}>
            <p>
              &copy; {new Date().getFullYear()} CortanaSoft. Всички права запазени.
            </p>
            <ul className={styles.socials}>
              <li>
                  <Link href="https://facebook.com" className={styles.socials__link}>
                    <FaFacebookF className={styles.socials__icon} />
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com" className={styles.socials__link}>
                    <FaTwitter className={styles.socials__icon} />
                  </Link>
                </li>
                <li>
                  <Link href="https://linkedin.com" className={styles.socials__link}>
                    <FaLinkedinIn className={styles.socials__icon} />
                  </Link>
                </li>
                <li>
                  <Link href="https://instagram.com" className={styles.socials__link}>
                    <FaInstagram className={styles.socials__icon} />
                  </Link>
                </li>
            </ul>
          </div>
        </div>
      </Shell>
    </footer>
  );
};

export default Footer;