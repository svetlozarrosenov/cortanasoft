import React from 'react';
import styles from './features-secondary.module.css';
import Shell from '@/components/shell';
import { FaBrain, FaUserCheck, FaClock, FaLink } from 'react-icons/fa';

const FeaturesSecondary: React.FC = () => {
  return (
    <div>
      <Shell>
        <div className={styles.section}>
          <div className={styles.sectionInner}>
            <h1 className={styles.title}>How Does Cortana AI Support Work?</h1>
          </div>

          <ul className={styles.boxes}>
            <li className={styles.box}>
                <FaBrain className={styles.boxIcon} />
                <h5 className={styles.boxTitle}>Smart Answers</h5>
                <p className={styles.boxContent}>Customers can set up a bank account in minutes</p>
            </li>
            <li className={styles.box}>
                <FaUserCheck className={styles.boxIcon} />
                <h5 className={styles.boxTitle}>Personalized Help</h5>
                <p className={styles.boxContent}>Round up purchases or set regular transfers into a savings account</p>
            </li>
            <li className={styles.box}>
                <FaClock className={styles.boxIcon} />
                <h5 className={styles.boxTitle}>24/7 Accessibility</h5>
                <p className={styles.boxContent}>Enables instant money transfers, both domestically and internationally</p>
            </li>
            <li className={styles.box}>
                <FaLink className={styles.boxIcon} />
                <h5 className={styles.boxTitle}>Easy Integration</h5>
                <p className={styles.boxContent}>Full-featured mobile app that allows users to manage their finances</p>
            </li>
          </ul>
        </div>
      </Shell>
    </div>
  );
};

export default FeaturesSecondary;