import React from 'react';
import { headerStyles, logoStyles, navMenuStyles, navItemStyles } from './header.styles';
import Navigation from './navigation';

const Header: React.FC = () => {
  return (
    <header style={headerStyles}>
      <div style={logoStyles}>CortanaSoft ERP</div>
      <Navigation />
    </header>
  );
};

export default Header;