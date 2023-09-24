import React from 'react';
import styled from 'styled-components';
import { faBtc, faEthereum, faGg } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  icon: any;
}

const Crypto: React.FC<CryptoProps> = ({ name, symbol, icon }) => (
  <CryptoItem>
    {name} ({symbol}) {icon}
  </CryptoItem>
);

const Overview: React.FC = () => {
  return (
    <Container>
      <Header>Most Profitable</Header>
      <Crypto name="Bitcoin" symbol="BTC" icon={<FontAwesomeIcon icon={faBtc} fade style={{color: "#0059b3"}} /> } />
      <Crypto name="Ethereum" symbol="ETH" icon={<FontAwesomeIcon icon={faEthereum} fade style={{color: "#0059b3"}} /> }/>
      <Crypto name="Cardano" symbol="ADA" icon={<FontAwesomeIcon icon={faGg} fade style={{color: "#0059b3"}} /> }/>
    </Container>
  );
};

export default Overview;
