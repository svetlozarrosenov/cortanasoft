import React from 'react';
import styles from './boxes.module.css';
import Shell from '../../shell';
import { FaHeart, FaCogs, FaLightbulb, FaUsers } from 'react-icons/fa';


const Boxes: React.FC = () => {
  return (
    <div>
      <Shell>
        <div className={styles.section}>
          <div className={styles.sectionInner}>
            <h1 className={styles.title}>Why Does Your Business Need CRM?</h1>
            <p className={styles.content}>At Cortana Soft, our CRM system is designed for the Bulgarian market, with features such as automated emails, lead tracking, and personalized reports.</p>
          </div>

          <ul className={styles.boxes}>
            <li className={styles.box}>
                <FaHeart className={styles.boxIcon} />
                <h5 className={styles.boxTitle}>Boost Loyalty</h5>
                <p className={styles.boxContent}>Improves customer service and loyalty.</p>
            </li>
            <li className={styles.box}>
                <FaCogs className={styles.boxIcon} />
                <h5 className={styles.boxTitle}>Automate Tasks</h5>
                <p className={styles.boxContent}>Automates processes for greater efficiency.</p>
            </li>
            <li className={styles.box}>
                <FaLightbulb className={styles.boxIcon} />
                <h5 className={styles.boxTitle}>Smarter Decisions</h5>
                <p className={styles.boxContent}>we have a strong customer support platform to serve our customer 24/7.</p>
            </li>
            <li className={styles.box}>
                <FaUsers className={styles.boxIcon} />
                <h5 className={styles.boxTitle}>Team Collaboration</h5>
                <p className={styles.boxContent}>It helps teams work together more effectively.</p>
            </li>
          </ul>
        </div>
      </Shell>
    </div>
  );
};

export default Boxes;