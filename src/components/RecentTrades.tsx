import React, { useEffect, useState } from 'react';

interface Props {
  pair: string;
}

const RecentTrades: React.FC<Props> = ({ pair }) => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // axios.get(`https://api.binance.com/api/v3/trades?symbol=${pair}`)
    //   .then((response) => {
    //     setTrades(response.data);
    //   });
  }, [pair]);

  const sortTrades = (key: 'time' | 'price' | 'qty') => {
  };

  return (
    <div>
    </div>
  );
};

export default RecentTrades;
