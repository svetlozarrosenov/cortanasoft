"use client";

import React, { useState } from "react";
import { subscribeMutate } from "./hooks";
import styles from "@/app/home.module.css";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      await subscribeMutate(email);
      setIsSubscribed(true);
      setEmail("");
    } catch (err) {
      alert("Възникна грешка. Моля, опитайте по-късно.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isSubscribed ? (
        <div className={styles.successMessage}>
          Благодарим ви! Очаквайте новини от Sentinel на вашия имейл.
        </div>
      ) : (
        <form className={styles.subscriptionForm} onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Вашият имейл адрес"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className={styles.subscriptionInput}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={styles.subscriptionButton}
          >
            {isLoading ? "Изпращане..." : "Абонирай се"}
          </button>
        </form>
      )}
    </>
  );
}