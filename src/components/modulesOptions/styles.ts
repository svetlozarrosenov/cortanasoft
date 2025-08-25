import { CSSProperties } from 'react';

export const sectionStyles: CSSProperties = {
  padding: '60px 20px',
  backgroundColor: '#ffffff',
  textAlign: 'center',
};

export const containerStyles: CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '#f8f9fa',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

export const titleStyles: CSSProperties = {
  fontSize: '32px',
  color: '#0dcaf0', // Основен цвят
  marginBottom: '20px',
};

export const basePriceStyles: CSSProperties = {
  fontSize: '18px',
  color: '#333',
  marginBottom: '20px',
};

export const optionStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginBottom: '20px',
  textAlign: 'left',
  paddingLeft: '20px',
};

export const totalStyles: CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#0dcaf0', // Основен цвят
  marginTop: '20px',
};