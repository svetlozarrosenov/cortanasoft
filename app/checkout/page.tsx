"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from '@/components/cart/hooks';
import { useUser } from "@/app/hooks";
import { createDevicesMutate, createOrderMutate } from "./hooks";
import styles from "./checkout.module.css";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    country: "",
    city: "",
    email: "",
    address: "",
    phone: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Автопопълване от потребителския профил
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        country: user.country || "",
        city: user.city || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!cart.items.length) {
        setError("Вашата количка е празна. Моля, добавете продукти преди да направите поръчка.");
        return;
      }

      setIsLoading(true);

      try {
        await createDevicesMutate(cart.items);
        await createOrderMutate(formData, cart.items);
        clearCart();
        router.push("/order-confirmation");
      } catch (err) {
        console.error("Грешка при checkout:", err);
        setError("Възникна грешка при обработката на поръчката. Моля, опитайте отново.");
      } finally {
        setIsLoading(false);
      }
    },
    [cart.items, formData, clearCart, router]
  );

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>Завършване на поръчката</h1>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.orderSummary}>
              <h3>Резюме на поръчката</h3>

              {cart.items.map((item, index) => (
                <div key={index} className={styles.orderItem}>
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    className={styles.productImage}
                  />
                  <div className={styles.productInfo}>
                    <div className={styles.productName}>{item.name}</div>
                    <div className={styles.productDetails}>
                      {item.quantity} × {item.price.toFixed(2)} лв.
                    </div>
                  </div>
                </div>
              ))}

              <div className={styles.orderTotal}>
                <strong>Общо:</strong> {cart.total.toFixed(2)} лв.
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? "Обработка..." : "Направи поръчка"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;