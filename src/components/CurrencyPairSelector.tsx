import React from 'react';

interface Props {
  onSelect: (pair: string) => void;
}

const CurrencyPairSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="BTCUSDT">BTC/USDT</option>
      <option value="ETHUSDT">ETH/USDT</option>
    </select>
  );
};

export default CurrencyPairSelector;
