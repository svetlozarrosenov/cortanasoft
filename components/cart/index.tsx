'use client';

import React from 'react';
import { useCart } from './hooks';
import styles from './cart.module.css'; // Импорт на CSS модула
import Link from 'next/link';

interface CartPopupProps {
  onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className={styles.cartPopupContainer}>
      {cart.items.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Вашата количка е празна</p>
          <Link href="/products" onClick={onClose} className={styles.linkButton}>
            Разгледайте продуктите
          </Link>
        </div>
      ) : (
        <>
          {cart.items.map((item: any, index: number) => (
            <div key={index} className={styles.cartItem}>
              <img src={'/images/' + item.image} alt={item.name} className={styles.productImage} />
              <div className={styles.productInfo}>
                <div className={styles.productName}>{item.name}</div>
                <div className={styles.productQuantity}>Количество: {item.quantity}</div>
                <div className={styles.productPrice}>{item.price} лв.</div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                &#10005;
              </button>
            </div>
          ))}
          <div className={styles.cartTotal}>
            Обща сума: {cart.total.toFixed(2)} лв.
          </div>
          <Link href="/checkout" onClick={onClose} className={styles.checkoutButton}>
            Към плащане
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPopup;