import React from 'react';
import styles from './additional.module.css';
import Shell from '../../shell';
import { FaHeart, FaCogs, FaLightbulb, FaUsers } from 'react-icons/fa';
import classNames from 'classnames';


const Additional: React.FC = () => {
  return (
    <div>
      <Shell>
        <div className={styles.section}>
          <div className={styles.sectionInner}>
            <h1 className={styles.title}>Additional Features of Cortana Soft</h1>
          </div>

          <ul className={styles.boxes}>
            <li className={styles.box}>
                <FaHeart className={styles.boxIcon} />
                <h5 className={styles.boxTitle}>Creating Tasks (Tickets)</h5>
                <p className={styles.boxContent}>Easily create and track tasks for your team, with priorities and deadlines.</p>
            </li>
            <li className={classNames(styles.box, styles.boxWhite)}>
                <FaCogs className={styles.boxIcon} />
                <h5 className={styles.boxTitle}>Comments and Discussions</h5>
                <p className={styles.boxContent}>Add comments to tasks, clients, or projects for better communication.</p>
            </li>
            <li className={classNames(styles.box, styles.boxWhite)}>
                <FaLightbulb className={styles.boxIcon} />
                <h5 className={styles.boxTitle}>Internal Chat</h5>
                <p className={styles.boxContent}>Integrated chat for real-time communication between the team, directly in the system.</p>
            </li>
          </ul>
        </div>
      </Shell>
    </div>
  );
};

export default Additional;