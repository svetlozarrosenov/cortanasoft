import React from 'react';
import {footerStyles, footerContentStyles, footerLinkStyles} from './footer.styles';
import Demo from './demo';

const Footer: React.FC = () => {
  return (
    <footer style={footerStyles}>
      <div style={footerContentStyles}>
        <p>&copy; 2025 CortanaSoft ERP. Всички права запазени.</p>
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