import React from 'react';
import styles from './info.module.css';
import Shell from '@/components/shell';

const Info: React.FC = () => {
  return (
    <div className={styles.section}>
      <Shell>
        <div className={styles.sectionInner}>
            <h1 className={styles.title}>The People Behind Cortana Soft</h1>

          <ul className={styles.features}>
            <li className={styles.feature}>
              <h5 className={styles.featureTitle}>Experts with Over 10 Years of Experience</h5>
              <p className={styles.featureContent}>Our programmers have over 10 years of experience developing software solutions for businesses. They combine technical expertise with a deep understanding of customer needs to create reliable and innovative products.</p>
            </li>
            <li className={styles.feature}>
              <h5 className={styles.featureTitle}>Passion for Innovation</h5>
              <p className={styles.featureContent}>Our team is dedicated to developing technologies that make a difference. From AI support to intuitive interfaces, we're here to make your work easier.</p>
            </li>
          </ul>
        </div>
      </Shell>
    </div>
  );
};

export default Info;