import type { CSSProperties } from 'react';

type StylesType = {
  [key: string]: CSSProperties | { [key: string]: CSSProperties };
};

export const styles: StylesType = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  },

  pageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    background: 'linear-gradient(135deg, rgba(110, 142, 251, 0.03), rgba(167, 119, 227, 0.03))',
  },

  loginContainer: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.25rem',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  },

  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },

  logo: {
    width: '120px',
    height: 'auto',
  },

  title: {
    color: '#2d3748',
    fontSize: '1.25rem',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '1.5rem',
  },

  titleGradient: {
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  loginForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },

  inputLabel: {
    color: '#4a5568',
    fontSize: '0.875rem',
    fontWeight: 500,
  },

  inputField: {
    // width: '100%',
    padding: '0.75rem',
    border: '1.5px solid #e3e8ef',
    borderRadius: '8px',
    fontSize: '1rem',
    color: '#4a5568',
    transition: 'all 0.2s ease',
    WebkitAppearance: 'none',
    appearance: 'none',
  },

  inputFieldFocus: {
    outline: 'none',
    borderColor: '#6e8efb',
    boxShadow: '0 0 0 3px rgba(110, 142, 251, 0.1)',
  },

  inputFieldPlaceholder: {
    color: '#a0aec0',
  },

  submitButton: {
    width: '100%',
    background: '#0dcaf0',
    color: 'white',
    border: 'none',
    padding: '0.875rem',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '0.5rem',
    WebkitTapHighlightColor: 'transparent',
  },

  submitButtonActive: {
    transform: 'scale(0.98)',
  },

  submitButtonDisabled: {
    background: '#e2e8f0',
    transform: 'none',
    cursor: 'not-allowed',
    opacity: 0.8,
  },

  errorMessage: {
    color: '#ef4444',
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.875rem',
    backgroundColor: '#fef2f2',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #fee2e2',
  },

  forgotPassword: {
    display: 'block',
    textAlign: 'center',
    color: '#6e8efb',
    textDecoration: 'none',
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    padding: '0.5rem',
  },

  forgotPasswordActive: {
    color: '#0dcaf0',
  },

  // Медия стилове се прилагат програмно в компонента
  largeScreen: {
    loginContainer: {
      padding: '2rem',
    },
    logo: {
      width: '160px',
    },
    title: {
      fontSize: '1.75rem',
    },
    inputField: {
      padding: '0.875rem 1rem',
    },
    submitButtonHover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 8px 20px rgba(110, 142, 251, 0.2)',
    },
  },
};