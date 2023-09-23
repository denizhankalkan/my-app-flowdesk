import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 16px;
  margin: 65px 10px 10px;
  height: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h3`
  margin: 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #ccc;
`;

const CryptoItem = styled.div`
  margin-top: 8px;
  padding: 8px;
  font-size: 18px;
`;

interface CryptoProps {
  name: string;
  symbol: string;
}

const Crypto: React.FC<CryptoProps> = ({ name, symbol }) => (
  <CryptoItem>
    {name} ({symbol})
  </CryptoItem>
);

const Overview: React.FC = () => {
  return (
    <Container>
      <Header>Most Profitable</Header>
      <Crypto name="Bitcoin" symbol="BTC" />
      <Crypto name="Ethereum" symbol="ETH" />
      <Crypto name="Cardano" symbol="ADA" />
    </Container>
  );
};

export default Overview;
