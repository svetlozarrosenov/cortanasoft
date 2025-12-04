import styles from './about.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'За Sentinel – Алармена система без SIM карта и месечни такси',
  description:
    'Sentinel е иновативна алармена система без SIM карта, без абонамент и с до 6 дни батерия. Мигновени известия при опит за кражба на велосипед, мотор или кола.',
  keywords:
    'sentinel, аларма без sim карта, алармена система без абонамент, защита велосипед, антикражба мотор, аларма за кола без такси, lora аларма',
  alternates: {
    canonical: 'https://yoursite.com/about',
  },
  openGraph: {
    title: 'За Sentinel – Иновативна защита без SIM и месечни такси',
    description:
      'Без SIM карта • Без абонамент • До 6 дни с едно зареждане • Мигновени известия при кражба',
    url: 'https://yoursite.com/about',
    images: [
      {
        url: '/og-about.jpg', // сложи си хубаво изображение 1200x630
        width: 1200,
        height: 630,
        alt: 'Sentinel – алармена система без SIM карта',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'За Sentinel – Аларма без SIM и абонамент',
    description: 'Мигновена защита за велосипед, мотор и кола с до 6 дни батерия',
    images: ['/og-about.jpg'],
  },
};

export default function AboutPage() {
  return (
    <main className={styles.pageContainer}>
      <section className={styles.hero}>
        <Image
          src="/images/about-hero.webp"
          alt="Sentinel алармена система – защита без SIM карта"
          width={1200}
          height={600}
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>
            За <span className={styles.highlight}>Sentinel</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Иновативна алармена система без SIM карта и месечни такси
          </p>
        </div>
      </section>

      <article className={styles.contentSection}>
        <header>
          <h1 className={styles.mainTitle}>За Sentinel</h1>
        </header>

        <section className={styles.introSection}>
          <p className={styles.paragraph}>
            Sentinel въвежда <strong>иновативен подход</strong> в сферата на сигурността, предлагайки интелигентна алармена система от ново поколение.{' '}
            <span className={styles.highlightText}>
              Нашето решение елиминира нуждата от SIM карти в сензорите — това означава никакви месечни такси за нашите потребители.
            </span>
          </p>
        </section>

        <section className={styles.featuresSection}>
          <h2 className={styles.subTitle}>Иновативна защита за вашата собственост</h2>
          <p className={styles.paragraph}>
            При засичане на нарушител системата <strong>моментално изпраща сигнал до вашия телефон</strong>, позволявайки незабавна реакция. 
            Това ви дава възможност да хванете крадеца на място — преди да е успял да се отдалечи с вашето превозно средство.
          </p>

          <h3 className={styles.featureTitle}>До 6 дни с едно зареждане</h3>
          <p className={styles.paragraph}>
            Нашите устройства са оборудвани с високоефективни батерии, осигуряващи <strong>до 6 дни автономна работа</strong> с едно зареждане. 
            По-малко грижи, повече спокойствие.
          </p>

          <h3 className={styles.featureTitle}>Универсална защита</h3>
          <p className={styles.paragraph}>
            Независимо дали става дума за <strong>автомобил</strong>, <strong>мотоциклет</strong> или <strong>скъп велосипед</strong> — Sentinel осигурява надеждна защита. 
            Вече можете да паркирате спокойно пред блока или да оставите велосипеда си на улицата.
          </p>
        </section>

        <section className={styles.networkSection}>
          <h2 className={styles.subTitle}>Част от нещо по-голямо</h2>
          <p className={styles.paragraph}>
            Sentinel работи на принципа на <strong>саморазрастваща се мрежа</strong>. 
            Всеки нов клиент автоматично става част от нашата инфраструктура — устройствата му допринасят за общото покритие. 
            Колкото повече потребители — толкова по-добър обхват за всички, напълно безплатно.
          </p>
          <p className={styles.paragraph}>
            Чрез нашето Progressive Web App получавате <strong>мигновени push известия</strong> директно на телефона си — без допълнителни разходи и сложни настройки.
          </p>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.callToAction}>
            <h2 className={styles.ctaTitle}>
              Sentinel е повече от аларма — това е спокойствието на бъдещето
            </h2>
            <p className={styles.ctaText}>
              Без месечни такси • Без сложни инсталации • Без компромис с качеството
            </p>
            <p className={styles.ctaText}>
              <strong>
                Присъединете се към мрежата на бъдещето и защитете това, което е важно за вас.
              </strong>
            </p>

            <Link href="/products" className={styles.ctaButton}>
              Вижте нашите продукти
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}