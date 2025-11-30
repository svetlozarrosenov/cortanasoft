"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  FaBox,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
} from "react-icons/fa";
import { useOrders } from "./hooks";
import { useUser } from '../hooks';
import styles from "./my-orders.module.css";

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  country: string;
  city: string;
  products: Product[];
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

// Малък компонент за статуса (запазваме го вътре в страницата)
const OrderStatus: React.FC<{ status: Order["status"] }> = ({ status }) => {
  const statusInfo = {
    pending: { Icon: FaBox, color: "#ffa500", text: "Очаква обработка" },
    processing: { Icon: FaBox, color: "#4169e1", text: "Обработва се" },
    shipped: { Icon: FaTruck, color: "#32cd32", text: "Изпратена" },
    delivered: { Icon: FaCheckCircle, color: "#228b22", text: "Доставена" },
    cancelled: { Icon: FaTimesCircle, color: "#dc143c", text: "Отменена" },
  };

  const { Icon, color, text } = statusInfo[status];

  return (
    <div className={styles.statusContainer} style={{ color }}>
      <Icon className={styles.statusIcon} />
      <span>{text}</span>
    </div>
  );
};

const MyOrdersPage = () => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { orders } = useOrders();

  React.useEffect(() => {
    if (!userLoading && !user) {
      router.replace("/login");
    }
  }, [user, userLoading, router]);

  if (userLoading || !user) {
    return (
      <>
        <div className={styles.loading}>Зареждане...</div>
      </>
    );
  }

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>Моите поръчки</h1>

          {orders && orders.length === 0 ? (
            <p className={styles.noOrders}>Все още нямате направени поръчки.</p>
          ) : (
            orders?.map((order: Order) => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div className={styles.orderNumber}>
                    Поръчка #{order._id.slice(-6).toUpperCase()}
                  </div>
                  <OrderStatus status={order.status} />
                </div>

                <div className={styles.orderDetails}>
                  <div className={styles.orderInfo}>
                    <strong>Име:</strong> {order.firstName} {order.lastName}
                    <br />
                    <strong>Държава:</strong> {order.country}
                    <br />
                    <strong>Град:</strong> {order.city}
                    <br />
                    <strong>Адрес:</strong> {order.address}
                    <br />
                    <strong>Телефон:</strong> {order.phone}
                  </div>

                  <div className={styles.productList}>
                    {order.products.map((product, idx) => (
                      <div key={idx} className={styles.productItem}>
                        <img
                          src={`/images/${product.image}`}
                          alt={product.name}
                          className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                          <div className={styles.productName}>
                            {product.name}
                          </div>
                          <div className={styles.productDetails}>
                            {product.quantity} × {product.price.toFixed(2)} лв.
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderTotal}>
                    Обща сума: <strong>{order.totalPrice.toFixed(2)} лв.</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;