import React from 'react';
import styles from './intro-secondary.module.css';

const IntroSecondary: React.FC = () => {
  return (
    <div className={styles.intro}>
        <h1 className={styles.title}>For Cortana Soft</h1>
        <p className={styles.content}>We are a team of passionate professionals who create innovative CRM and ERP solutions to help businesses in Bulgaria thrive.</p>
    </div>
  );
};

export default IntroSecondary;