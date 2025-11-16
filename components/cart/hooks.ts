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
  const [cart, setCart] = useState<Cart>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Опционално: Sync с NestJS API (MongoDB) в useEffect за всяка промяна
    // axios.post('/api/cart/sync', cart).catch(err => console.error('Sync error:', err));
  }, [cart]);

  const addToCart = (product: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.id === product.id);
      let newItems: CartItem[];
      let newTotal: number;

      if (existingItem) {
        // Увеличи quantity, ако item вече съществува (избягва дубликати)
        newItems = prevCart.items.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        newTotal = prevCart.total + product.price;
      } else {
        // Добави нов item
        newItems = [...prevCart.items, { ...product, quantity: 1 }];
        newTotal = prevCart.total + product.price;
      }

      // Пуш нотификация: Изпрати към Firebase или NestJS
      // navigator.serviceWorker.ready.then(reg => reg.pushManager.getSubscription().then(sub => {
      //   axios.post('/api/notifications/push', { message: `Добавено: ${product.name}`, subscription: sub });
      // }));

      return { items: newItems, total: newTotal };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.items.find(item => item.id === productId);
      if (!itemToRemove) return prevCart;

      let newItems: CartItem[];
      let newTotal: number;

      if (itemToRemove.quantity > 1) {
        // Намали quantity, ако >1
        newItems = prevCart.items.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
        newTotal = prevCart.total - itemToRemove.price;
      } else {
        // Премахни, ако quantity ==1
        newItems = prevCart.items.filter(item => item.id !== productId);
        newTotal = prevCart.total - itemToRemove.price;
      }

      // Пуш нотификация: "Премахнато от количка"
      // ...

      return { items: newItems, total: newTotal };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
    // Sync с NestJS: axios.post('/api/cart/clear');
  };

  return { cart, addToCart, removeFromCart, clearCart };
};