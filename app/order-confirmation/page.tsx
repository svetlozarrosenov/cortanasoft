"use client";

import React from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./order-confirmation.module.css";

const OrderConfirmationPage = () => {
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          {/* Иконка за успех */}
          <div className={styles.confirmationIcon}>
            <FaCheckCircle size={60} className={styles.icon} />
          </div>

          {/* Заглавие */}
          <h1 className={styles.title}>
            Благодарим за Вашата <span>поръчка</span>!
          </h1>

          {/* Основни съобщения */}
          <p className={styles.message}>
            Вашата поръчка е успешно приета и обработена. Поръчаните устройства
            вече са свързани с профила Ви в нашата система.
          </p>
          <p className={styles.message}>
            Очаквайте скоро обаждане от наш консултант за потвърждение на
            поръчката и уточняване на детайлите по доставката.
          </p>

          {/* Информационен бокс */}
          <div className={styles.infoBox}>
            <h2 className={styles.infoTitle}>
              Какво <span>следва</span>?
            </h2>
            <ul className={styles.infoList}>
              <li>Ще получите имейл с потвърждение на поръчката.</li>
              <li>
                Наш консултант ще се свърже с Вас в рамките на 24 часа.
              </li>
              <li>
                След потвърждение, ще подготвим устройствата за изпращане.
              </li>
              <li>
                Ще Ви уведомим, когато поръчката е изпратена, с информация за
                проследяване.
              </li>
            </ul>
          </div>

          {/* Бутони */}
          <div className={styles.buttonContainer}>
            <Link href="/my-devices" className={styles.button}>
              Моите устройства
            </Link>
            <Link href="/" className={styles.button}>
              Начална страница
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;