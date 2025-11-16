import React from 'react';
import styles from './footer.module.css'; // Импорт на CSS модула
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>За нас</h3>
          <Link href="/about" className={styles.footerLink}>
            За компанията
          </Link>
          <Link href="/contacts" className={styles.footerLink}>
            Контакти
          </Link>
          <div className={styles.contactInfo}>
            <p>📍 София, България</p>
            <p>📞 +359 87 664 9967</p>
            <p>✉️ sentinel@sentinel-bg.info</p>
          </div>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Услуги</h3>
          <Link href="/services" className={styles.footerLink}>
            Нашите услуги
          </Link>
          <Link href="/products" className={styles.footerLink}>
            Цени
          </Link>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Поддръжка</h3>
          <Link href="/faq" className={styles.footerLink}>
            Често задавани въпроси
          </Link>
          <Link href="/terms" className={styles.footerLink}>
            Общи условия
          </Link>
        </div>
      </div>
      
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Sentinel. Всички права запазени.
      </div>
    </footer>
  );
};

export default Footer;