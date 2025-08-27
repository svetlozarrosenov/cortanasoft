import React from 'react';
import styles from './about.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>За CortanaSoft ERP</h1>
      <p className={styles.description}>
        CortanaSoft ERP е водеща компания, специализирана в разработването на иновативни софтуерни решения за автоматизация на бизнес процесите. Ние предлагаме мощни инструменти, които помагат на малки и средни предприятия да оптимизират операциите си, да увеличат ефективността и да вземат информирани решения.
      </p>
      <p className={styles.description}>
        Нашите продукти включват модули за управление на инвентара, заплати, анализи и повече, всичко в облачно базирана платформа, проектирана с фокус върху вашите нужди. С години опит и отдаден екип, ние сме тук, за да подкрепим растежа на вашия бизнес.
      </p>
      <div className={styles.contact}>
        <p>Свържете се с нас:</p>
        <p>Телефон: <a href="tel:+359886801802" className={styles.contactLink}>+359 886 801 802</a></p>
        <p>Email: <a href="mailto:sales@cortanaSoft.com" className={styles.contactLink}>sales@cortanaSoft.com</a></p>
      </div>
    </div>
  );
};

export default About;