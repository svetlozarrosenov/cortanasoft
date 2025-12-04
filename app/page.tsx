import Intro from '@/components/Intro';
import SubscribeForm from '@/components/homepage/SubscribeForm';
import Link from 'next/link';
import styles from './home.module.css';
import Image from 'next/image';

export const metadata = {
  title: 'Sentinel Алармени Системи – Защита за велосипед, мотор и кола без SIM и абонамент',
  description:
    'Иновативна алармена система без SIM карта и месечни такси. Мигновени push известия на телефона при опит за кражба. До 6 дни батерия, лесна инсталация.',
  keywords:
    'алармена система, sentinel, защита велосипед, антикражба мотор, аларма без sim карта, lora аларма, аларма без абонамент',
  openGraph: {
    title: 'Sentinel – Иновативна алармена система без SIM и такси',
    description: 'Мигновени известия при опит за кражба. Без SIM, без абонамент, до 6 дни с едно зареждане.',
    images: ['/og-image.jpg'],
    url: 'https://yoursite.com',
    type: 'website',
  },
  alternates: {
    canonical: 'https://yoursite.com',
  },
};

export default function HomePage() {
  return (
    <>
      <Intro />

      <div className={styles.homeContainer}>
        <h1 className={styles.title}>
          <span>Sentinel</span> Алармени Системи
        </h1>
        <h2 className={styles.subtitle}>
          Иновативна защита за вашите велосипеди, мотори и коли!
        </h2>

        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Без SIM карта</h3>
            <p className={styles.featureDescription}>
              Сентинел не използва SIM карта за да изпраща известия към телефона Ви, което означава, че няма нужда да плащате месечни абонаменти.
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Широк обхват</h3>
            <p className={styles.featureDescription}>
              Нашата система осигурява надеждна защита. Обхвата на Сентинел се разраства с всеки клиент. Ако няма клиенти във вашия район, обхватът ще е между 1 и 5 км в зависимост от гъстотата на сградите.
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Мобилно приложение</h3>
            <p className={styles.featureDescription}>
              Нашият сайт е Progressive Web App – сваля се като приложение с 2 клика. Получавате мигновени push известия при опит за кражба.
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Бърза реакция</h3>
            <p className={styles.featureDescription}>
              Моментално известяване при активиране на алармата – без шум, само директно на вашия телефон.
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Енергийно ефективна</h3>
            <p className={styles.featureDescription}>
              До 6 дни с едно зареждане благодарение на иновативна LoRa технология с ниска консумация.
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Лесна инсталация</h3>
            <p className={styles.featureDescription}>
              Бърз и опростен процес – включвате приемника, слагате сензора и сте готови.
            </p>
          </li>
        </ul>

        <Link href="/products" className={styles.ctaButton}>
          Виж нашите продукти
        </Link>

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
                  Чрез нашата иновативна технология получавате моментално известие на телефона си:
                </p>
                <ul>
                  <li>Без нужда от SIM карта</li>
                  <li>Без месечни абонаменти</li>
                  <li>Без излишен шум, който само предупреждава крадеца</li>
                  <li>С възможност за незабавна реакция</li>
                </ul>
              </div>
              <div className={styles.infoImage}>
                <Image
                  src="/images/home-alarm.webp"
                  alt="Sentinel алармена система в действие"
                  width={600}
                  height={400}
                  priority
                />
              </div>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>
              Как работи <span>Sentinel</span>?
            </h2>
            <div className={styles.infoContent}>
              <div className={styles.infoImage}>
                <Image
                  src="/images/home-alarm-town.webp"
                  alt="Мрежа от приемници на Sentinel"
                  width={600}
                  height={400}
                />
              </div>
              <div className={styles.infoText}>
                <p>
                  Sentinel използва мрежа от приемници, стратегически разположени в града, които
                  препредават сигнала от вашата аларма до нашите сървъри, а оттам – директно до телефона ви.
                </p>
                <p>
                  Получавате известие моментално, където и да сте, стига да имате интернет. Системата работи надеждно дори в гъсто застроени райони.
                </p>
                <ul>
                  <li>Постоянно разрастваща се мрежа от приемници</li>
                  <li>Надеждна комуникация в градски условия</li>
                  <li>Мигновено известяване</li>
                  <li>Автоматично свързване с най-близкия приемник</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>
              Как да започнете със <span>Sentinel</span>?
            </h2>
            <div className={styles.infoContent}>
              <div className={styles.infoText}>
                <p>Само няколко прости стъпки:</p>
                <ol>
                  <li>Регистрирайте се и поръчайте сензор + приемник</li>
                  <li>Получавате устройства с предварително конфигуриран софтуер</li>
                  <li>Инсталирайте PWA приложението на телефона си</li>
                  <li>Свържете приемника към домашния Wi-Fi</li>
                  <li>Поставете сензора на превозното средство – готово!</li>
                </ol>

                <p><strong>Инсталиране на приложението:</strong> Отворете сайта в Chrome/Safari → "Добави към начален екран". Push известията работят на Android и iOS 16.4+.</p>
                <p><strong>Настройка на приемника:</strong></p>
                <ol>
                  <li>Включете в контакта</li>
                  <li>Свържете се към WiFi "sentinel_config"</li>
                  <li>Отворете браузър → автоматично отваряне на конфигурационния панел</li>
                  <li>Изберете вашата WiFi мрежа и въведете парола</li>
                </ol>

                <p><strong>Гаранция и поддръжка:</strong></p>
                <ul>
                  <li>До 6 дни с едно зареждане</li>
                  <li>Зареждане през Type-C (5V)</li>
                  <li>2 години гаранция</li>
                  <li>Денонощна телефонна поддръжка</li>
                  <li>Безплатно посещение в София при проблем</li>
                </ul>
              </div>
              <div className={styles.infoImage}>
                <Image
                  src="/images/home-alarm-town.webp"
                  alt="Настройка на Sentinel система"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.testimonialsSection}>
          <h2 className={styles.testimonialsTitle}>
            Какво казват нашите <span>клиенти</span>
          </h2>
          <div className={styles.testimonialsList}>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "Използвам го за велосипеда си и вече не се притеснявам, че ще го откраднат. Приложението веднага ме уведомява."
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
                "Ползвам Sentinel за колата си и ми харесва, че мога да следя всичко от телефона си. Уведомленията работят перфектно."
              </p>
              <p className={styles.testimonialAuthor}>- Десислава Петрова, Пловдив</p>
            </div>
          </div>
        </section>

        <section className={styles.subscriptionSection}>
          <h2 className={styles.subscriptionTitle}>
            Абонирайте се за нашия бюлетин
          </h2>
          <SubscribeForm />
        </section>
      </div>
    </>
  );
}