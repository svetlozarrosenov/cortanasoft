import React from 'react';
import styles from './services.module.css';

const Services: React.FC = () => {
  return (
    <>
      <div className={styles.servicesContainer}>
        <h1 className={styles.title}>
          Нашите <span>Услуги</span>
        </h1>
        <p className={styles.subtitle}>
          Предлагаме цялостно решение за сигурност, включващо хардуер, софтуер и
          професионална поддръжка за вашето спокойствие
        </p>

        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <h2 className={styles.serviceTitle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Цялостна Cloud Платформа
            </h2>
            <p className={styles.serviceDescription}>
              Нашата cloud платформа обработва и анализира данните от вашите устройства
              в реално време, осигурявайки надеждна защита 24/7.
            </p>
            <ul className={styles.serviceFeatures}>
              <li>Обработка на данни в реално време</li>
              <li>Защитено съхранение на информацията</li>
              <li>Автоматични ъпдейти на системата</li>
              <li>Високa надеждност и достъпност</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <h2 className={styles.serviceTitle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12" y2="18"/>
              </svg>
              Мобилно Приложение
            </h2>
            <p className={styles.serviceDescription}>
              Мобилното ни приложение ви държи информирани за състоянието на вашите
              устройства, където и да се намирате.
            </p>
            <ul className={styles.serviceFeatures}>
              <li>Мигновени push известия</li>
              <li>Интуитивен потребителски интерфейс</li>
              <li>Поддръжка за Android и iOS</li>
              <li>Без нужда от инсталация (PWA)</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <h2 className={styles.serviceTitle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              Уеб Платформа
            </h2>
            <p className={styles.serviceDescription}>
              Модерна уеб платформа за управление на вашите устройства с разширени
              възможности за наблюдение и контрол.
            </p>
            <ul className={styles.serviceFeatures}>
              <li>Достъп от всяко устройство</li>
              <li>Детайлна статистика и анализи</li>
              <li>Управление на множество устройства</li>
              <li>Персонализируеми настройки</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <h2 className={styles.serviceTitle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12" y2="17"/>
              </svg>
              Техническа Поддръжка
            </h2>
            <p className={styles.serviceDescription}>
              Предлагаме професионална техническа поддръжка и сервиз за безпроблемната
              работа на вашите устройства.
            </p>
            <ul className={styles.serviceFeatures}>
              <li>Денонощна телефонна поддръжка</li>
              <li>Посещение на място в София</li>
              <li>Онлайн консултации</li>
              <li>Бързо отстраняване на проблеми</li>
            </ul>
          </div>
        </div>

        <div className={styles.supportSection}>
          <h2 className={styles.supportTitle}>
            Нашите <span>Гаранции</span>
          </h2>
          <div className={styles.supportContent}>
            <div className={styles.supportCard}>
              <div className={styles.supportIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
                </svg>
              </div>
              <h3 className={styles.supportCardTitle}>2 Години Гаранция</h3>
              <p className={styles.supportCardDescription}>
                Пълна гаранция на всички устройства за период от 2 години с
                възможност за безплатна подмяна при фабрични дефекти.
              </p>
            </div>

            <div className={styles.supportCard}>
              <div className={styles.supportIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <h3 className={styles.supportCardTitle}>Професионален Сервиз</h3>
              <p className={styles.supportCardDescription}>
                Оторизиран сервиз с професионални техници и бързо време за реакция
                при възникнали проблеми.
              </p>
            </div>

            <div className={styles.supportCard}>
              <div className={styles.supportIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h3 className={styles.supportCardTitle}>Техническа Помощ</h3>
              <p className={styles.supportCardDescription}>
                Винаги на разположение за съдействие при настройка и използване на устройствата с 
                бърза реакция при проблеми.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;