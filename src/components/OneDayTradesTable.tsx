import React from 'react';
import { Table } from '../components/shared/Table';
import { TradesHeader } from './StyledComponents';

interface Trade {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

interface Ticker24hrProps {
  data: Trade | null;
}

const Ticker24hr: React.FC<Ticker24hrProps> = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const headers = ["Symbol", "Price Change", "Last Quantity", "Quote Volume", "Open Time", "Close Time", "Count"];
  
  const rows = [[
    data.symbol,
    data.priceChange,
    data.lastQty,
    data.quoteVolume,
    new Date(data.openTime).toLocaleString(),
    new Date(data.closeTime).toLocaleString(),
    data.count
  ]];

  return (
    <div>
      <TradesHeader>24H Trades</TradesHeader>
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default Ticker24hr;
