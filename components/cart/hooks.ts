"use client";

import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  type: string;
}

interface Cart {
  items: CartItem[];
  total: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [hydrated, setHydrated] = useState(false);

  // Зареждаме от localStorage само на клиента
  useEffect(() => {
    setHydrated(true);
    try {
      const saved = localStorage.getItem('cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Грешка при четене на количката', e);
    }
  }, []);

  // Записваме само на клиента
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, hydrated]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.items.find(i => i.id === product.id);
      if (existing) {
        return {
          items: prev.items.map(i =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          total: prev.total + product.price
        };
      }
      return {
        items: [...prev.items, { ...product, quantity: 1 }],
        total: prev.total + product.price
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const item = prev.items.find(i => i.id === productId);
      if (!item) return prev;

      if (item.quantity > 1) {
        return {
          items: prev.items.map(i =>
            i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
          ),
          total: prev.total - item.price
        };
      }
      return {
        items: prev.items.filter(i => i.id !== productId),
        total: prev.total - item.price
      };
    });
  };

  const clearCart = () => setCart({ items: [], total: 0 });

  return {
    cart: hydrated ? cart : { items: [], total: 0 }, // важно!
    addToCart,
    removeFromCart,
    clearCart,
  };
};