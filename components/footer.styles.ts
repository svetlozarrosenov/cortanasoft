import type { CSSProperties } from 'react';

export const footerStyles: CSSProperties = {
  backgroundColor: '#0092b5',
  color: 'white',
  padding: '20px 30px',
  position: 'relative',
  width: '100%',
  bottom: 0,
  textAlign: 'center',
  boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
};

export const footerContentStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  flexWrap: 'wrap',
  gap: '20px',
};

export const footerLinkStyles: CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  margin: '0 15px',
  fontSize: '14px',
  transition: 'color 0.3s ease',
};