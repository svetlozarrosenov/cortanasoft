import React from 'react';
import { headerStyles, logoStyles, navMenuStyles, navItemStyles } from './styles';

const Header: React.FC = () => {
  return (
    <header style={headerStyles}>
      <div style={logoStyles}>ZodSoft ERP</div>
      <nav style={navMenuStyles}>
        <a href="#dashboard" style={navItemStyles}>Табло</a>
        <a href="#modules" style={navItemStyles}>Модули</a>
        <a href="#reports" style={navItemStyles}>Отчети</a>
        <a href="#settings" style={navItemStyles}>Настройки</a>
      </nav>
    </header>
  );
};

export default Header;