import type { CSSProperties } from 'react';

export const headerStyles: CSSProperties = {
  backgroundColor: '#0dcaf0',
  color: 'white',
  padding: '15px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1000,
};

export const logoStyles: CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '1px',
};

export const navMenuStyles: CSSProperties = {
  display: 'flex',
  gap: '20px',
};

export const navItemStyles: CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
  transition: 'color 0.3s ease',
};

export const navItemHoverStyles: CSSProperties = {
  color: '#F0F8FF',
};