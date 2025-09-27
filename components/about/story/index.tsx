import React from 'react';
import styles from './story.module.css';
import Shell from '@/components/shell';
import Image from 'next/image';
import classNames from 'classnames';

interface StoryProps {
  image?: string;
  reversed?: boolean;
}


const Story: React.FC<StoryProps> = ({image, reversed = false}) => {
  return (
    <div>
      <Shell>
        <div className={classNames(styles.section, reversed ? styles.storyReversed : null)}>
          <div className={styles.sectionInner}>
            <h1 className={styles.title}>Built to Empower Businesses</h1>
            <p className={styles.content}>Cortana Soft was founded with the mission to provide Bulgarian businesses with powerful, easy-to-use and affordable software solutions. Inspired by the needs of small and medium-sized enterprises, we developed an intelligent CRM and ERP system, supported by our unique AI assistant – Cortana.</p>
            <p className={styles.content}>Our goal is to make business management more efficient, transparent and adaptable. With a focus on the Bulgarian market, we offer localized solutions that meet specific needs and regulations.</p>
          </div>

          <div className={styles.image}>
            {image && <Image
                src={image}
                alt="Automated Tracking"
                width={282}
                height={100}
                className={styles.featureImage}
              />}
          </div>
        </div>
      </Shell>
    </div>
  );
};

export default Story;