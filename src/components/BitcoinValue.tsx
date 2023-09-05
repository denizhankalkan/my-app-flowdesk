import React, { useState, useEffect } from 'react';

const BitcoinValue: React.FC = () => {
  const [bitcoinValue, setBitcoinValue] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@ticker`);

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setBitcoinValue(data.c);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ top: 0, right: 0, zIndex: 1000 }}>
      {bitcoinValue ? `BTC: $${bitcoinValue}` : 'Loading...'}
    </div>
  );
};

export default BitcoinValue;
