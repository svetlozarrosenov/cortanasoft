import React from 'react';
import Link from 'next/link';
import styles from './button.module.css';

const Button: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Link href="/login" className={styles.button}>
      <span>{children}</span>
    </Link>
  );
};

export default Button;