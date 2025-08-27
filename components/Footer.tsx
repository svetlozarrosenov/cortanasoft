import React from 'react';
import from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer style={footerStyles}>
      <div style={footerContentStyles}>
        <p>&copy; 2025 ZodSoft ERP. Всички права запазени.</p>
        <div>
          <a href="#privacy" style={footerLinkStyles}>Политика за поверителност</a>
          <a href="#terms" style={footerLinkStyles}>Условия за ползване</a>
          <a href="#contact" style={footerLinkStyles}>Контакти</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;