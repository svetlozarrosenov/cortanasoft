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
            <h1 className={styles.title}>Какво е CortanaSoft?</h1>
            <p className={styles.content}>CortanaSoft обединява ERP, BPM, CRM и BI в една платформа, опростявайки счетоводството, търговията, производството, услугите, планирането и прогнозирането за по-интелигентно управление на бизнеса.</p>
          </div>

          <ul className={styles.features}>
            <li className={styles.feature}>
              <FaCogs className={styles.featureIcon} />
              <h5 className={styles.featureTitle}>ERP</h5>
              <p className={styles.featureContent}>Исторически, софтуерните продукти за управление на бизнеса са се установили като отделни системи за счетоводство, търговия, производство и т.н. ERP системите се появяват на пазара като решение на този проблем, интегрирайки всички функционалности в една.</p>
            </li>
            <li className={styles.feature}>
              <FaSitemap className={styles.featureIcon} />
              <h5 className={styles.featureTitle}>BPM</h5>
              <p className={styles.featureContent}>Управлението на бизнес процесите е основната работна идеология на CortanaSoft. Дейността на компанията се разделя на индивидуални бизнес процеси и всеки процес има своя диаграма на задачи, които трябва да бъдат изпълнени.</p>
            </li>
            <li className={styles.feature}>
              <FaUsers className={styles.featureIcon} />
              <h5 className={styles.featureTitle}>CRM</h5>
              <p className={styles.featureContent}>Идеята на системите от тип CRM е да улеснят и координират всички дейности, предприети при работа с клиенти, с крайната цел да се увеличат успеха на продажбите и подобряване на следпродажбеното обслужване на клиентите.</p>
            </li>
            <li className={styles.feature}>
              <FaChartBar className={styles.featureIcon} />
              <h5 className={styles.featureTitle}>BI</h5>
              <p className={styles.featureContent}>Бизнес изследванията и анализите са система от специални видове отчети, предназначени за анализи чрез задаване на въпроси и получаване на отговори. За разлика от традиционните отчети, обикновено използвани в ERP софтуерните продукти, които показват двумерна информация в колони.</p>
            </li>
          </ul>
        </div>
      </Shell>
    </div>
  );
};

export default Features;