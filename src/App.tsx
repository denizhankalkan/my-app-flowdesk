// import React, { useState, useEffect } from 'react';
// import RecentTradesTable from './components/RecentTradesTable';
// import axios from 'axios';

// const App: React.FC = () => {
//   const [pair, setPair] = useState<string>('btcusdt');
//   const [ticker, setTicker] = useState<any>(null);
//   const [trades, setTrades] = useState<any[]>([]);

//   useEffect(() => {
//     const wsTicker = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@ticker`);
//     wsTicker.onmessage = (event) => {
//       setTicker(JSON.parse(event.data));
//     };

//     axios.get(`https://api.binance.com/api/v3/trades?symbol=${pair.toUpperCase()}`)
//       .then(response => {
//         setTrades(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching trade data:', error);
//       });

//     return () => {
//       wsTicker.close();
//     };
//   }, [pair]);

//   return (
//     <div>
//       <h1>Binance Market Data</h1>
//       <form>
//         <label>
//           Select Trading Pair:
//           <select value={pair} onChange={(e) => setPair(e.target.value)}>
//             <option value="btcusdt">BTCUSDT</option>
//             <option value="ethusdt">ETHUSDT</option>
//             <option value="xrpusdt">XRPUSDT</option>
//           </select>
//         </label>
//       </form>

//       {ticker && <h2>Current Price: {ticker.c}</h2>}

//       {trades.length > 0 && (
//         <div>
//           <h2>Recent Trades</h2>
//           <RecentTradesTable trades={trades} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setActiveTable } from './stores/actions';

// function App() {
//   const dispatch = useDispatch();
//   const activeTable = useSelector((state: any) => state.table.activeTable);

//   const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     dispatch(setActiveTable(e.target.value));
//   };

//   return (
//     <div>

//       <select onChange={handleTableChange}>
//         <option value="TICKER">Ticker Data</option>
//         <option value="TICKER_24H">24h Ticker Data</option>
//         <option value="RECENT_TRADES">Recent Trades</option>
//       </select>

//       {activeTable === 'TICKER' && <div> tablo 1</div>}
//       {activeTable === 'TICKER_24H' && <div> tablo 2 </div>}
//       {activeTable === 'RECENT_TRADES' && <div>tablo 3</div>}
//     </div>
//   );
// }

// export default App;


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
  const [fixedRecentTrades, setFixedRecentTrades] = useState([]);

    const dispatch = useDispatch();
    const activeTable = useSelector((state: any) => state.table.activeTable);

    const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setActiveTable(e.target.value));
    };

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currencyPair.toLowerCase()}@ticker`);
   
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setOneDayTrades(data);
    };

    // const wss = new WebSocket(`wss://stream.binance.com:9443/ws/${currencyPair.toLowerCase()}@ticker`);
   
    // ws.onmessage = (message) => {
    //   const data = JSON.parse(message.data);
    //   setRecentTrades(data);
    // };
   
    // Fetch initial data for recent trades
    axios.get(`https://api.binance.com/api/v3/trades?symbol=${currencyPair}`)
      .then(response => setRecentTrades(response.data));

    axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${currencyPair}`)
    .then(response => setFixedRecentTrades(response.data));

    // // Fetch initial data for fixed recent trades (BNBUSDT)
    // axios.get('https://api.binance.com/api/v3/trades?symbol=BNBUSDT')
    //   .then(response => setFixedRecentTrades(response.data));

    return () => {
      ws.close();
    };
  }, [currencyPair]);

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
       <option value="TICKER">Ticker Data</option>
       <option value="TICKER_24H">24h Ticker Data</option>      
       <option value="RECENT_TRADES">Recent Trades</option>
    </select>

     {activeTable === 'TICKER' && <div>  <OneDayTrades data={oneDayTrades} /> </div>}
     {activeTable === 'TICKER_24H' && <div> <RecentTrades data={recentTrades} /></div>}
     {activeTable === 'RECENT_TRADES' && <div>tablo 3</div>}


    </div>
  );
};

export default App;
