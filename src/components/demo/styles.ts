import { CSSProperties } from 'react';

export const sectionStyles: CSSProperties = {
  padding: '60px 20px',
  backgroundColor: '#f8f9fa',
  textAlign: 'center',
};

export const containerStyles: CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
};

export const titleStyles: CSSProperties = {
  fontSize: '32px',
  color: '#0dcaf0', // Основен цвят
  marginBottom: '20px',
};

export const buttonStyles: CSSProperties = {
  padding: '12px 30px',
  fontSize: '18px',
  backgroundColor: '#0dcaf0', // Основен цвят
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export const popupStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

export const popupContentStyles: CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  position: 'relative',
  maxWidth: '400px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

export const closeStyles: CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#0dcaf0',
};

export const formStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginTop: '20px',
};

export const inputStyles: CSSProperties = {
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ced4da',
  borderRadius: '4px',
  outline: 'none',
};

export const submitStyles: CSSProperties = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#0dcaf0', // Основен цвят
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};