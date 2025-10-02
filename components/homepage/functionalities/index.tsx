import React from 'react';
import styles from './functionalities.module.css';
import Shell from '@/components/shell';
import { FaCheckCircle } from 'react-icons/fa';

const Functionalities: React.FC = () => {
  return (
    <div>
      <Shell>
        <div className={styles.section}>
          <div className={styles.sectionInner}>
            <h1 className={styles.title}>What do you get for 200 BGN/month?</h1>
          </div>

          <ul className={styles.boxes}>
            <li className={styles.box}>
                <h5 className={styles.boxTitle}>CRM Functionalities</h5>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Automated emails</p>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Create and track tasks</p>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Internal team chat</p>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Planning calendar</p>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Organization notes</p>
            </li>
            <li className={styles.box}>
                <h5 className={styles.boxTitle}>ERP Functionalities</h5>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Customer and lead management</p>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Automated emails</p>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Create and track tasks</p>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Internal team chat</p>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Planning calendar</p>
            </li>
            <li className={styles.box}>
                <h5 className={styles.boxTitle}>Additional Benefits</h5>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Free phone support and assistance</p>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Free email support and assistance</p>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />Automatic system update</p>
                <p className={styles.boxContent}><FaCheckCircle className={styles.boxIcon} />24/7 support from Cortana AI</p>
            </li>
          </ul>
        </div>
      </Shell>
    </div>
  );
};

export default Functionalities;