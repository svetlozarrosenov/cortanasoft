'use client'; // За клиентски състояния като useState и useRouter

import React, { useState } from 'react';
import styles from './home.module.css'; // Импорт на CSS модула
import Intro from '@/components/Intro';
import { subscribeMutate } from './hooks';
import { useRouter } from 'next/navigation'; // За навигация в Next.js

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const router = useRouter(); // Замества useNavigate

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutate(email);
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <>
      <Intro />
      <div className={styles.homeContainer}>
        <h1 className={styles.title}>
          <span>Sentinel</span> Алармени Системи
        </h1>
        <h2 className={styles.subtitle}>Иновативна защита за вашите велосипеди, мотори и коли!</h2>
        
        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Без SIM карта</h3>
            <p className={styles.featureDescription}>
              Сентинел не използва SIM карта за да изпраща известия към телефона Ви, 
              което означава, че няма нужда да плащате месечни абонаменти.
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Широк обхват</h3>
            <p className={styles.featureDescription}>
              Нашата система осигурява надеждна защита. Обхвата на Сентинел се разраства с всеки клиент. 
              Ако няма клиенти във вашия район, то обхвата ще е между 1 и 5км в зависимост от това 
              каква е гъстотата на сградите около вас.
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Мобилно приложение</h3>
            <p className={styles.featureDescription}>
              Нашият сайт е създаден като Progressive Web App, което означава, че само с два клика 
              се сваля като мобилно приложение на телефона Ви. По този начин може да получавате 
              известия в реално време, когато някой опитва да открадне имуществото Ви.
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Бърза реакция</h3>
            <p className={styles.featureDescription}>
              Моментално известяване при активиране на алармата. Когато свалите сайта ни като мобилно 
              приложение, ще получавате мигновени известия при опит да бъде откраднато имуществото Ви.
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Енергийно ефективна</h3>
            <p className={styles.featureDescription}>
              Нашата система използва иновативна технология за ниска консумация на енергия. 
              До 6 дни с едно зареждане!
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Лесна инсталация</h3>
            <p className={styles.featureDescription}>
              Бърз и опростен процес на инсталиране.
            </p>
          </li>
        </ul>
        
        <button className={styles.ctaButton} onClick={() => router.push('/products')}>
          Виж нашите продукти
        </button>

        <section className={styles.infoSection}>
          <div className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>
              <span>Иновативна</span> технология за защита
            </h2>
            <div className={styles.infoContent}>
              <div className={styles.infoText}>
                <p>
                  За разлика от традиционните аларми, които само вдигат шум и предупреждават крадеца,
                  Sentinel работи по съвсем различен начин. Вместо да алармира околните, системата
                  тихо ви известява в момента, в който някой се опитва да открадне вашето превозно средство.
                </p>
                <p>
                  Това ви дава уникалното предимство да хванете крадеца на място, вместо просто да го подплашите.
                  Чрез нашата иновативна технология, получавате моментално известие на телефона си:
                </p>
                <ul>
                  <li>Без нужда от SIM карта</li>
                  <li>Без месечни абонаменти</li>
                  <li>Без излишен шум, който само предупреждава крадеца</li>
                  <li>С възможност за незабавна реакция</li>
                </ul>
              </div>
              <div className={styles.infoImage}>
                <img src="images/home-alarm.webp" alt="Sentinel Алармена Система в действие" />
              </div>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>
              Как работи <span>Sentinel</span>?
            </h2>
            <div className={styles.infoContent}>
              <div className={styles.infoImage}>
                <img src="images/home-alarm-town.webp" alt="Как работи Sentinel" />
              </div>
              <div className={styles.infoText}>
                <p>
                  Sentinel използва мрежа от приемници, стратегически разположени в града, които
                  препредават сигнала от вашата аларма до нашите сървъри, а оттам - директно до
                  вашия телефон.
                </p>
                <p>
                  Това означава, че получавате известие моментално, където и да се намирате, стига
                  да имате интернет връзка. Нашата система е проектирана да работи надеждно дори
                  в градски условия с много пречки и смущения.
                </p>
                <ul>
                  <li>Мрежа от приемници с постоянно разрастващ се обхват</li>
                  <li>Надеждна комуникация дори в градска среда</li>
                  <li>Мигновено известяване на вашия телефон</li>
                  <li>Автоматично свързване с най-близките приемници</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.infoBlock}>
          <h2 className={styles.infoTitle}>
            Как да започнете със <span>Sentinel</span>?
          </h2>
          <div className={styles.infoContent}>
            <div className={styles.infoText}>
              <p>
                За да започнете да използвате Sentinel, следвайте тези прости стъпки:
              </p>
              <ul>
                <li>Регистрирайте се в нашия сайт и направете поръчка на сензор и приемник</li>
                <li>След поръчката ще получите устройства със специално конфигуриран софтуер за вас</li>
                <li>Свалете нашето приложение на телефона си за известия в реално време</li>
                <li>Настройте приемника към домашната си WiFi мрежа</li>
                <li>Поставете сензора на вашето превозно средство и сте защитени!</li>
              </ul>
              <p>
                <strong>Инсталиране на мобилното приложение:</strong><br/>
                Нашият сайт е Progressive Web App, което означава че можете да го инсталирате директно 
                на вашия телефон. При посещение на сайта, браузърът ще ви предложи опция "Добави към 
                начален екран". Push известията работят на Android 5.0+ и iOS 16.4+.
              </p>
              <p>
                <strong>Настройка на приемника:</strong><br/>
                1. Включете приемника в контакта<br/>
                2. Свържете се към WiFi мрежата "sentinel_config"<br/>
                3. Отворете който и да е сайт - ще бъдете пренасочени към конфигурационния панел<br/>
                4. Изберете вашата домашна WiFi мрежа от списъка и въведете паролата
              </p>
              <p>
                <strong>За вашето спокойствие:</strong><br/>
                • Сензорът работи до 6 дни с едно зареждане<br/>
                • Зарежда се с Type-C кабел (5V)<br/>
                • 2 години гаранция на всички устройства<br/>
                • Денонощна телефонна поддръжка<br/>
                • Безплатно посещение на адрес при проблеми в София
              </p>
            </div>
            <div className={styles.infoImage}>
              <img src="images/home-alarm-town.webp" alt="Как да настроите вашата Sentinel система" />
            </div>
          </div>
        </div>
        <section className={styles.testimonialsSection}>
          <h2 className={styles.testimonialsTitle}>
            Какво споделят нашите <span>клиенти</span>
          </h2>
          <div className={styles.testimonialsList}>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "Използвам го за велосипеда си и вече не се притеснявам, че ще го откраднат. Приложението веднага ме уведомява, ако нещо се случи."
              </p>
              <p className={styles.testimonialAuthor}>- Николай Стоянов, София</p>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "Няма месечни такси, което е огромен плюс!"
              </p>
              <p className={styles.testimonialAuthor}>- Александър Георгиев, Варна</p>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "Ползвам Sentinel за колата си и ми харесва, че мога да следя всичко от телефона си. Уведомленията работят перфектно, а батерията държи дълго."
              </p>
              <p className={styles.testimonialAuthor}>- Десислава Петрова, Пловдив</p>
            </div>
          </div>
        </section>
        <section className={styles.subscriptionSection}>
          <h2 className={styles.subscriptionTitle}>Абонирайте се за нашия бюлетин</h2>
          {isSubscribed ? (
            <div className={styles.successMessage}>
              Благодарим ви за абонирането! Очаквайте скоро нашия бюлетин.
            </div>
          ) : (
            <form className={styles.subscriptionForm} onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Въведете вашия имейл"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.subscriptionInput}
              />
              <button type="submit" className={styles.subscriptionButton}>
                Абонирай се
              </button>
            </form>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;