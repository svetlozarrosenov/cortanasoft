import React from 'react';
import Image from 'next/image';
import styles from './features-with-reversed.module.css';
import Shell from '@/components/shell';
import classNames from 'classnames';

const FeaturesWithReversed: React.FC = () => {
  return (
    <div>
      <Shell>
        <div className={styles.section}>
          <div className={styles.sectionInner}>
            <h1 className={styles.title}>Warehouse Software for Effective Management</h1>
          </div>

          <ul className={styles.features}>
            <li className={styles.feature}>
              <Image
                src="/images/automated-tracking.png"
                alt="Automated Tracking"
                width={282}
                height={100}
                className={styles.featureImage}
              />
              <div className={styles.featureInner}>
                <h5 className={styles.featureTitle}>Automated Tracking</h5>
                <p className={styles.featureContent}>Monitor inventory in real time to avoid shortages or overstocks.</p>
              </div>
            </li>
            <li className={classNames(styles.feature, styles.featureReversed)}>
              <Image
                src="/images/integration-with-orders.png"
                alt="Integration with Orders"
                width={282}
                height={100}
                className={styles.featureImage}
              />
              <div className={styles.featureInner}>
                <h5 className={styles.featureTitle}>Integration with Orders</h5>
                <p className={styles.featureContent}>Connect your warehouse with sales and deliveries for a seamless flow.</p>
              </div>
            </li>
            <li className={styles.feature}>
              <Image
                src="/images/reports-and-analytics.png"
                alt="Reports and Analytics"
                width={282}
                height={100}
                className={styles.featureImage}
              />
              <div className={styles.featureInner}>
                <h5 className={styles.featureTitle}>Reports and Analytics</h5>
                <p className={styles.featureContent}>Generate detailed reports for warehouse process optimization.</p>
              </div>
            </li>
            <li className={classNames(styles.feature, styles.featureReversed)}>
              <Image
                src="/images/mobile-access.jpg"
                alt="Mobile Access"
                width={282}
                height={100}
                className={styles.featureImage}
              />
              <div className={styles.featureInner}>
                <h5 className={styles.featureTitle}>Mobile Access</h5>
                <p className={styles.featureContent}>Manage your warehouse from any device, anywhere.</p>
              </div>
            </li>
          </ul>
        </div>
      </Shell>
    </div>
  );
};

export default FeaturesWithReversed;