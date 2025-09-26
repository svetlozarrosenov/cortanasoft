import React from 'react';
import styles from './shell.module.css';

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.shell}>{children}</div>
  );
};

export default Shell;