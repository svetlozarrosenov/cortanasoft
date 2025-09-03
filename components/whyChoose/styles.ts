import type { CSSProperties } from 'react';

export const sectionStyles: CSSProperties = {
  padding: '60px 20px',
  backgroundColor: '#f8f9fa',
  textAlign: 'center',
};

export const containerStyles: CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
};

export const boxStyles: CSSProperties = {
  backgroundColor: '#0092b5', // Основен цвят
  color: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
};

export const boxTitleStyles: CSSProperties = {
  fontSize: '22px',
  marginBottom: '10px',
};

export const boxTextStyles: CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.5',
};