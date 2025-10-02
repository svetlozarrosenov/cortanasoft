import React from 'react';
import styles from './section.module.css';
import Shell from '../../shell';
import { FaMoneyBillWave, FaDatabase, FaRocket, FaCheckCircle } from 'react-icons/fa';

const Section: React.FC = () => {
  return (
        <div className={styles.section}>
          <div className={styles.sectionInner}>
            <h1 className={styles.title}>Why Does Your Business Need ERP?</h1>
            <p className={styles.content}>Cortana Soft ERP offers full integration, including warehouse software for inventory management, order tracking, and automated invoicing.</p>
          </div>

          <ul className={styles.boxes}>
            <li className={styles.box}>
                <div className={styles.boxInner}>
                    <FaMoneyBillWave className={styles.boxIcon} />
                    <h5 className={styles.boxTitle}>Cut Costs</h5>
                </div>
                <p className={styles.boxContent}>Reduces costs through efficient resource management.</p>
            </li>
            <li className={styles.box}>
                <div className={styles.boxInner}>
                    <FaDatabase className={styles.boxIcon} />
                    <h5 className={styles.boxTitle}>Accurate Data</h5>
                </div>
                <p className={styles.boxContent}>Improves data accuracy and reduces errors.</p>
            </li>
            <li className={styles.box}>
                <div className={styles.boxInner}>
                    <FaRocket className={styles.boxIcon} />
                    <h5 className={styles.boxTitle}>Faster Productivity</h5>
                </div>
                <p className={styles.boxContent}>Speeds up processes and improves productivity.</p>
            </li>
            <li className={styles.box}>
                <div className={styles.boxInner}>
                    <FaCheckCircle className={styles.boxIcon} />
                    <h5 className={styles.boxTitle}>Stay Compliant</h5>
                </div>
                <p className={styles.boxContent}>Ensures compliance with regulations and standards.</p>
            </li>
          </ul>
        </div>
  );
};

export default Section;