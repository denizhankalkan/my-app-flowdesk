import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBtc } from '@fortawesome/free-brands-svg-icons';



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
      <FontAwesomeIcon icon={faBtc} fade style={{color: "#ffe74d",}} /> {bitcoinValue ? `BTC: $${bitcoinValue}` : 'Loading...'}
    </div>
  );
};

export default BitcoinValue;

// todo: real time other crypto units could be add. 
