"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from '@/app/login/hooks';
import { useProduct } from "./hooks";
import { useCart } from "@/components/cart/hooks"; // ← твоят useCart от преди
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./product.module.css";

const ProductDetailPage = () => {
  const { productId } = useParams() as { productId: string };
  const router = useRouter();
  const { user } = useUser();
  const { product } = useProduct(productId);
  const { addToCart } = useCart();

  const [notification, setNotification] = useState<string | null>(null);

  if (!product) {
    return (
      <>
        <div className={styles.container}>Продуктът не е намерен.</div>
      </>
    );
  }

  const handleAddToCart = () => {
    // Ако няма логнат потребител → към login
    if (!user) {
      router.push("/login");
      return;
    }

    // Специална логика за сензори – трябва да има поръчан приемник
    if (product.type === "sensor") {
      const hasReceiver = user.orders?.some(
        (order: any) =>
          order.products?.some((p: any) => p.type === "receiver") ||
          order.type === "receiver"
      );

      if (!hasReceiver) {
        setNotification(
          "Трябва да поръчате и приемник, за да използвате този сензор."
        );
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

    setNotification("Продуктът е добавен в кошницата!");
    setTimeout(() => setNotification(null), 4000); // скрива се след 4 сек
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>
          <span>{product.name}</span>
        </h1>

        <img
          src={`/images/${product.image}`}
          alt={product.name}
          className={styles.image}
        />

        <div className={styles.description}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {product.description}
          </ReactMarkdown>
        </div>

        <div className={styles.price}>{product.price.toFixed(2)} лв.</div>

        <button onClick={handleAddToCart} className={styles.orderButton}>
          Добави в кошницата
        </button>

        {notification && (
          <div className={styles.notification}>{notification}</div>
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;