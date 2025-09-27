import React from 'react';
import styles from './intro-secondary.module.css';

interface introInterface {
  data: {
    title: string;
    content: string;
  }
}
const IntroSecondary: React.FC<introInterface> = ({data}) => {
  return (
    <div className={styles.intro}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.content}>{data.content}</p>
    </div>
  );
};

export default IntroSecondary;