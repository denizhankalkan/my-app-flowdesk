import React from 'react';
import { StyledTable, TradesHeader } from './StyledComponents';

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

  return (
    <div>
      <TradesHeader>24H Trades</TradesHeader>
      {data ? (
        <StyledTable>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price Change</th>
              <th>Last Quantity</th>
              <th>Quote Volume</th>
              <th>Open Time</th>
              <th>Close Time</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{data.symbol}</td>
                <td>{data.priceChange}</td>
                <td>{data.lastQty}</td>
                <td>{data.quoteVolume}</td>
                <td>{new Date(data.openTime).toLocaleString()}</td>
                <td>{new Date(data.closeTime).toLocaleString()}</td>
                <td>{data.count}</td>
              </tr>
          </tbody>
        </StyledTable>
      ) : (
        <div>Loading 24h Data...</div>
      )}
    </div>
  );
};

export default Ticker24hr;
