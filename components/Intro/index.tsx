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
            <h1 className={styles.introHeader}>Най-лесната CRM/ERP система на пазара!</h1>
            <p className={styles.introContent}>Умръзна ли ви от сложни, тромави системи? Запознайте се с CortanaSoft. Най-лесната система на пазара!</p>
            <Link className={styles.button} href={'/'}>Заяви демо</Link>
          </div>
        </div>
      </Shell>
    </div>
  );
};

export default Intro;