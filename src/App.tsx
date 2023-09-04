import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTable } from './stores/actions';

import OneDayTrades from './components/OneDayTradesTable';
import RecentTrades from './components/RecentTradesTable';
import TickerTradesTable from './components/TickerTradesTable';

const App: React.FC = () => {
  const [currencyPair, setCurrencyPair] = useState('BTCUSDT');
  const [oneDayTrades, setOneDayTrades] = useState(null);
  const [recentTrades, setRecentTrades] = useState([]);
  // const [tickerTrades, setTickerTrades] = useState([]);

    const dispatch = useDispatch();
    const activeTable = useSelector((state: any) => state.table.activeTable);

    const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setActiveTable(e.target.value));
    };

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currencyPair.toLowerCase()}@ticker`);
   
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(data);
    };
   
    axios.get(`https://api.binance.com/api/v3/trades?symbol=${currencyPair}&limit=20`)
      .then(response => setRecentTrades(response.data));

    axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${currencyPair}`)
      .then(response => setOneDayTrades(response.data));

    // axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${currencyPair}`)
    //   .then(response => setOneDayTrades(response.data));

    return () => {
      ws.close();
    };
  }, [currencyPair]);

// {{url}}/api/v3/ticker/price  => our URL ??? NEED ASK 
  return (
    <div>
      <h1>Binance Market Data</h1>

      <select onChange={(e) => setCurrencyPair(e.target.value)} value={currencyPair}>
        <option value="BTCUSDT">BTCUSDT</option>
        <option value="ETHUSDT">ETHUSDT</option>
        <option value="XRPUSDT">XRPUSDT</option>
      </select>

      {/* <TickerTradesTable data={fixedRecentTrades} /> */}

    <select onChange={handleTableChange}>
       <option value="TICKER_24H">24h Ticker Data</option>      
       <option value="RECENT_TRADES">Recent Trades</option>
    </select>

     {activeTable === 'TICKER_24H' && <div>  <OneDayTrades data={oneDayTrades} /> </div>}
     {activeTable === 'RECENT_TRADES' && <div> <RecentTrades data={recentTrades} /></div>}
     {/* {activeTable === 'RECENT_TRADES' && <div><TickerTradesTable data={TickerTradesTable} /> </div> } */}

    </div>
  );
};

export default App;
