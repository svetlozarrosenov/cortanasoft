import React from 'react';
import { headerStyles, logoStyles, navMenuStyles, navItemStyles } from './header.styles';
import Navigation from './navigation';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header style={headerStyles}>
      <div style={logoStyles}><Link href="/">CortanaSoft ERP</Link></div>
      <Navigation />
    </header>
  );
};

export default Header;