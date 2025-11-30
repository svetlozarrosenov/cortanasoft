"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmPasswordReset } from "./hooks";
import styles from "./reset-password.module.css";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("Невалиден или липсващ токен за възстановяване.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Паролите не съвпадат. Моля, проверете ги.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Паролата трябва да бъде поне 6 символа.");
      return;
    }

    setIsSubmitting(true);

    try {
      await confirmPasswordReset(token, newPassword);
      setMessage("Паролата е успешно сменена! Пренасочване към вход...");
      
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (error: any) {
      setMessage(
        error?.message || "Грешка при смяната на паролата. Моля, опитайте отново."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>
            Смяна на <span>парола</span>
          </h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="password"
              placeholder="Въведете новата парола"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              className={styles.input}
              disabled={isSubmitting}
            />
            <input
              type="password"
              placeholder="Повторете новата парола"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className={styles.input}
              disabled={isSubmitting}
            />

            <button
              type="submit"
              disabled={isSubmitting || !newPassword || !confirmPassword}
              className={styles.button}
            >
              {isSubmitting ? "Обработка..." : "Смени парола"}
            </button>
          </form>

          {message && (
            <p
              className={`${styles.message} ${
                message.includes("успешно") || message.includes("Пренасочване")
                  ? styles.success
                  : styles.error
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;