import React from 'react';
import { Table, Th, Td } from './StyledComponents';

interface Ticker24hrProps {
  data: {
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
  } | null;
}

const Ticker24hr: React.FC<Ticker24hrProps> = ({ data }) => {
  console.log("data")
  return (
    <div>
      <h2>Ticker 24hr Data</h2>
      {data ? (
        <Table>
          <thead>
            <tr>
              <Th>Field</Th>
              <Th>Value</Th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <Td>{key}</Td>
                <Td>{value.toString()}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Ticker24hr;
