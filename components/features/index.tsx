import React from 'react';
import styles from './features.module.css';
import Shell from '../shell';
import { FaCogs, FaSitemap, FaUsers, FaChartBar } from 'react-icons/fa';

const Features: React.FC = () => {
  return (
    <div>
      <Shell>
        <div className={styles.section}>
          <div className={styles.sectionInner}>
            <h1 className={styles.title}>What is Cortana Soft?</h1>
            <p className={styles.content}>CortanaSoft unifies ERP, BPM, CRM, and BI into one platform, streamlining accounting, trading, manufacturing, services, planning, and forecasting for smarter business management.</p>
          </div>

          <ul className={styles.features}>
            <li className={styles.feature}>
              <FaCogs className={styles.featureIcon} />
              <h5 className={styles.featureTitle}>ERP</h5>
              <p className={styles.featureContent}>Historically, the business management software products have been established as separate systems for accounting, trade, manufacturing, etc. The ERP systems appear on the market as a solution to this problem by integrating all functionalities in one View More</p>
            </li>
            <li className={styles.feature}>
              <FaSitemap className={styles.featureIcon} />
              <h5 className={styles.featureTitle}>BPM</h5>
              <p className={styles.featureContent}>Business process management is the basic work ideology of CortanaSoft. The activity of the company is divided into individual business processes and each process has its own diagram of tasks that must be fulfilled. View More</p>
            </li>
            <li className={styles.feature}>
              <FaUsers className={styles.featureIcon} />
              <h5 className={styles.featureTitle}>CRM</h5>
              <p className={styles.featureContent}>The idea of the CRM-type systems is to facilitate and coordinate all activities undertaken when dealing with clients, the ultimate objective being to increase the success of sales and improvement of the post-sales customer service.View More</p>
            </li>
            <li className={styles.feature}>
              <FaChartBar className={styles.featureIcon} />
              <h5 className={styles.featureTitle}>BI</h5>
              <p className={styles.featureContent}>Business Research and Analyses is a system of special types of reports intended for analyses by asking questions and receiving answers. Unlike the traditional reports usually used in the ERP software products which show two-dimensional information in columns. View More</p>
            </li>
          </ul>
        </div>
      </Shell>
    </div>
  );
};

export default Features;