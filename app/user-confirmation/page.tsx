"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import styles from "./user-confirmation.module.css";

const ConfirmRegistrationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "expired" | "error" | null>(
    null
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    const confirmRegistration = async () => {
      if (!token) {
        setStatus("error");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/register/confirm?token=${token}`
        );

        // Очакваме от backend: { status: "success" | "expired" | "error" }
        setStatus(response.data.status || "success");
      } catch (err: any) {
        // Ако backend върне 400/410 → expired, иначе error
        if (err.response?.data?.status === "expired") {
          setStatus("expired");
        } else {
          setStatus("error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    confirmRegistration();
  }, [token]);

  const handleContinue = () => {
    router.push("/login");
  };

  const handleResendConfirmation = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/register/resend-confirmation`
      );
      alert("Нов линк за потвърждение е изпратен на вашия имейл адрес.");
    } catch (error) {
      alert(
        "Възникна грешка при изпращането на нов линк. Моля, опитайте отново по-късно."
      );
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.confirmationContainer}>
          {isLoading ? (
            <div className={styles.spinner} />
          ) : status === "success" ? (
            <>
              <h2 className={styles.title}>
                Успешно потвърждение на регистрацията
              </h2>
              <p className={styles.message}>
                Вашата регистрация беше успешно потвърдена. Вече можете да
                влезете в акаунта си.
              </p>
              <button onClick={handleContinue} className={styles.button}>
                Продължи към вход
              </button>
            </>
          ) : status === "expired" ? (
            <>
              <h2 className={styles.title}>
                Линкът за потвърждение е изтекъл
              </h2>
              <p className={styles.message}>
                Изглежда, че линкът е изтекъл. Желаете ли да получите нов?
              </p>
              <button
                onClick={handleResendConfirmation}
                className={styles.button}
              >
                Изпрати нов линк
              </button>
            </>
          ) : (
            <>
              <h2 className={styles.title}>
                Възникна проблем при потвърждение
              </h2>
              <p className={styles.message}>
                Моля, опитайте отново или се свържете с поддръжката.
              </p>
              <button onClick={() => router.push("/")} className={styles.button}>
                Върни се към начало
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmRegistrationPage;