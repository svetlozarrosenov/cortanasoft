'use client'; // За клиентски хукове като useState, useEffect, useCart

import React, { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth, useUser } from '@/app/hooks';
import { useCart } from '@/components/cart/hooks'; // Или твоя useCart хук с localStorage
import CartPopup from '@/components/cart';
import styles from './header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, isUnauthorized } = useUser();
  const { logout } = useAuth();
  const { cart, clearCart } = useCart();
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCartPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    clearCart();
  };

  const isCurrentPath = (path: string) => pathname === path;

  return (
    <header className={styles.headerContainer}>
      <Link href="/" className={styles.logoLink}>
        <img src="/logo.svg" alt="Sentinel Logo" className={styles.logoImage} />
      </Link>
      
      <div className={styles.burgerIcon} onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <Link 
          href="/" 
          onClick={toggleMenu}
          className={`${styles.navLink} ${isCurrentPath('/') ? styles.active : ''}`}
        >
          Начало
        </Link>
        
        {user && (
          <Link 
            href="/alarms" 
            onClick={toggleMenu}
            className={`${styles.navLink} ${isCurrentPath('/alarms') ? styles.active : ''} ${styles.alarmLink}`}
          >
            Аларми
          </Link>
        )}
        
        {user && user.role === 'admin' && (
          <Link 
            href="/admin" 
            onClick={toggleMenu}
            className={`${styles.navLink} ${isCurrentPath('/admin') ? styles.active : ''} ${styles.alarmLink}`}
          >
            Админ
          </Link>
        )}

        {user && (
          <div className={styles.subMenuContainer}>
            <Link 
              href="/my-devices" 
              onClick={toggleMenu}
              className={`${styles.navLink} ${isCurrentPath('/my-devices') || isCurrentPath('/subscribed-devices') ? styles.active : ''}`}
            >
              Устройства
            </Link>
            <div className={styles.subMenu}>
              <Link 
                href="/my-devices" 
                onClick={toggleMenu}
                className={`${styles.subMenuLink} ${isCurrentPath('/my-devices') ? styles.active : ''}`}
              >
                Моите устройства
              </Link>
              <Link 
                href="/subscribed-devices" 
                onClick={toggleMenu}
                className={`${styles.subMenuLink} ${isCurrentPath('/subscribed-devices') ? styles.active : ''}`}
              >
                Абонирани устройства
              </Link>
            </div>
          </div>
        )}
        
        <Link 
          href="/products" 
          onClick={toggleMenu}
          className={`${styles.navLink} ${isCurrentPath('/products') ? styles.active : ''}`}
        >
          Продукти
        </Link>
        
        {user && (
          <Link 
            href="/checkout" 
            onClick={toggleMenu}
            className={`${styles.navLink} ${isCurrentPath('/checkout') ? styles.active : ''}`}
          >
            Плащане
          </Link>
        )}

        <Link 
          href="/about" 
          onClick={toggleMenu}
          className={`${styles.navLink} ${isCurrentPath('/about') ? styles.active : ''}`}
        >
          За нас
        </Link>
        
        {user && (
          <Link 
            href="/my-orders" 
            onClick={toggleMenu}
            className={`${styles.navLink} ${isCurrentPath('/my-orders') ? styles.active : ''}`}
          >
            Поръчки
          </Link>
        )}
        
        <Link 
          href="/map" 
          onClick={toggleMenu}
          className={`${styles.navLink} ${isCurrentPath('/map') ? styles.active : ''}`}
        >
          Карта
        </Link>

        <Link 
          href="/contacts" 
          onClick={toggleMenu}
          className={`${styles.navLink} ${isCurrentPath('/contacts') ? styles.active : ''}`}
        >
          Контакти
        </Link>
        
        {(isUnauthorized || !user) && (
          <>
            <Link 
              href="/register" 
              onClick={toggleMenu}
              className={`${styles.navLink} ${isCurrentPath('/register') ? styles.active : ''}`}
            >
              Регистрация
            </Link>
            
            <Link 
              href="/login" 
              onClick={toggleMenu}
              className={`${styles.navLink} ${isCurrentPath('/login') ? styles.active : ''}`}
            >
              Вход
            </Link>
          </>
        )}
        
        {user && (
          <button 
            onClick={() => { 
              handleLogout(); 
              toggleMenu(); 
            }}
            className={styles.logoutButton}
          >
            Изход
          </button>
        )}
      </nav>
      
      {user && (
        <div className={styles.cartIcon} ref={cartRef}>
          <div onClick={() => setShowCartPopup(!showCartPopup)}>
            <FaShoppingCart size={20} />
            <span className={styles.cartCount}>{cart.items.length}</span>
          </div>
          {showCartPopup && <CartPopup onClose={() => setShowCartPopup(false)} />}
        </div>
      )}
      
      {user && <div className={styles.userInfo}>Здравей, {user.firstName}!</div>}
    </header>
  );
}

export default Header;