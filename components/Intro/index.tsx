import React from 'react';
import styles from './intro.module.css';
import Shell from '../shell';
import Link from 'next/link';

const Intro: React.FC = () => {
  return (
    <div>
      <Shell>
        <div className={styles.intro}>
          <div className={styles.introInner}>
            <h1 className={styles.introHeader}>One Business System, Endless Possibilities!</h1>
            <p className={styles.introContent}>Reliable, fast, and adaptable to your business, Cortana Soft offers intelligent CRM and ERP solutions backed by 24/7 AI support from Cortana.</p>
            <Link className={styles.button} href={'/'}>Get Started Now</Link>
          </div>
        </div>
      </Shell>
    </div>
  );
};

export default Intro;