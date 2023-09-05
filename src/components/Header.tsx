import React from 'react';
import BitcoinValue from './BitcoinValue';

const Header: React.FC = () => {
  return (
    <header style={{ backgroundColor: '#264d73', color: '#fff', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>Tracking Crypto</h1>
      <BitcoinValue />
    </header>
  );
};

export default Header;
