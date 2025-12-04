import styles from './intro.module.css';

export default function Intro() {
  return (
    <div className={styles.introContainer}>
      <video
        className={styles.introVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/intro.png"
      >
        <source src="/videos/sentinel2-intro-video.webm" type="video/webm" />
        <source src="/videos/sentinel-2intro-video.mp4" type="video/mp4" />
        <img src="/images/intro.png" alt="Sentinel алармена система" />
      </video>

      <div className={styles.introContent}>
        <h1 className={styles.introTitle}>Добре дошли в Sentinel</h1>
        <p className={styles.introText}>
          Sentinel предлага най-съвременните алармени системи, осигурявайки спокойствие 
          за вашите колелета, мотори, коли, дом и бизнес. Нашата иновативна технология 
          разраства покритието ни в градовете с всеки нов клиент!
        </p>
      </div>
    </div>
  );
}

