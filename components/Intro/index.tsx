import React from 'react';
import styles from './intro.module.css'; // Импорт на CSS модула

const Intro: React.FC = () => (
  <div className={styles.introContainer}>
    <div className={styles.introContent}>
      <h2 className={styles.introTitle}>Добре дошли в Sentinel</h2>
      <p className={styles.introText}>
        Sentinel предлага най-съвременните алармени системи, осигурявайки спокойствие за вашите колелета, мотори, коли, дом и бизнес.
        Нашата иновативна технология разраства покритието ни в градовете с всеки нов клиент!
      </p>
    </div>
  </div>
);

export default Intro;