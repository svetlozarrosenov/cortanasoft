import type { CSSProperties } from 'react';

type StylesType = {
  [key: string]: CSSProperties;
};

export const styles: StylesType = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  contentSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px',
  },

  contentContainer: {
    display: 'grid',
    gap: '40px',
    maxWidth: '800px',
    margin: '0 auto',
  },

  title: {
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '3rem',
    textAlign: 'center',
    marginBottom: '50px',
    fontWeight: 600,
  },

  titleMobile: {
    fontSize: '2.5rem',
    marginBottom: '40px',
  },

  contactInfo: {
    marginBottom: '40px',
  },

  contactTitle: {
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '1.8rem',
    marginBottom: '20px',
    fontWeight: 500,
  },

  contactDetail: {
    color: '#4a5568',
    fontSize: '1.125rem',
    lineHeight: 1.8,
    letterSpacing: '0.3px',
    marginBottom: '12px',
  },

  contactDetailLast: {
    marginBottom: 0,
  },

  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  input: {
    padding: '12px',
    border: '2px solid rgba(110, 142, 251, 0.2)',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
  },

  inputFocus: {
    outline: 'none',
    borderColor: '#6e8efb',
  },

  textarea: {
    padding: '12px',
    border: '2px solid rgba(110, 142, 251, 0.2)',
    borderRadius: '8px',
    minHeight: '150px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    resize: 'vertical',
  },

  button: {
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 500,
    transition: 'opacity 0.3s ease',
  },

  buttonHover: {
    opacity: 0.9,
  },
};