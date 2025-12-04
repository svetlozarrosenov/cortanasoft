"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/login/hooks";
import { useCart } from "@/components/cart/hooks";
import styles from "./product.module.css";

export default function AddToCartButton({ product }: { product: any }) {
  const router = useRouter();
  const { user } = useUser();
  const { addToCart } = useCart();
  const [notification, setNotification] = useState<string | null>(null);

  const handleClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Проверка за сензори – трябва да има приемник
    if (product.type === "sensor") {
      const hasReceiver = user.orders?.some((order: any) =>
        order.products?.some((p: any) => p.type === "receiver")
      );

      if (!hasReceiver) {
        setNotification("Трябва първо да поръчате приемник!");
        return;
      }
    }

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: product.type,
    });

    setNotification("Добавено в кошницата!");
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <>
      <button onClick={handleClick} className={styles.orderButton}>
        Добави в кошницата
      </button>

      {notification && (
        <div className={styles.notification}>{notification}</div>
      )}
    </>
  );
}