// import React, { useState } from 'react';
// import CurrencyPairSelector from './components/CurrencyPairSelector';
// import MarketDataDisplay from './components/MarketDataDisplay';
// import RecentTrades from './components/RecentTrades';

// const App: React.FC = () => {
//   const [selectedPair, setSelectedPair] = useState<string>("BTCUSDT");

//   const handlePairSelection = (pair: string) => {
//     setSelectedPair(pair);
//   };

//   return (
//     <div>
//       <h1>Binance Market Data</h1>
//       <CurrencyPairSelector onSelect={handlePairSelection} />
//       <h2>Market Data for {selectedPair}</h2>
//       <MarketDataDisplay pair={selectedPair} />
//       <h2>Recent Trades for {selectedPair}</h2>
//       <RecentTrades pair={selectedPair} />
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useState } from "react"; // çalışan bir app

// const App: React.FC = () => {
//   const [price, setPrice] = useState<number | null>(null);

//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:8080");

//     ws.addEventListener("message", (event) => {
//       const data = JSON.parse(event.data);
//       console.log("data", data);
//       setPrice(data.price);
//     });

//     return () => {
//       ws.close();
//     };
//   }, []);

//   return (
//     <div className="App">
//       <h1>WebSocket ile Finansal Ticaret Örneği</h1>
//       {price !== null ? (
//         <h2>Güncel Fiyat: {price}</h2>
//       ) : (
//         <h2>Veri yükleniyor...</h2>
//       )}
//     </div>
//   );
// };

// export default App;







// import React, { useState, useEffect } from 'react';

// interface DataType {
//   time: number;
//   price: number;
//   quantity: number;
// }

// const App: React.FC = () => {
//   const [data, setData] = useState<DataType[]>([]);
//   const [sortBy, setSortBy] = useState<'time' | 'price' | 'quantity'>('time'); // 'time', 'price', or 'quantity'

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:8080');

//     ws.onmessage = (event) => {
//       const newData: DataType = JSON.parse(event.data);
//       // Assuming that newData contains 'time', 'price', and 'quantity' fields
//       setData(oldData => [...oldData, newData]);
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const sortData = (field: 'time' | 'price' | 'quantity') => {
//     setSortBy(field);
//     const sortedData = [...data].sort((a, b) => {
//       if (a[field] < b[field]) return -1;
//       if (a[field] > b[field]) return 1;
//       return 0;
//     });
//     setData(sortedData);
//   };

//   return (
//     <div className="App">
//       <h1>24hr Bitcoin Data from Binance</h1>
//       <button onClick={() => sortData('time')}>Sort by Time</button>
//       <button onClick={() => sortData('price')}>Sort by Price</button>
//       <button onClick={() => sortData('quantity')}>Sort by Quantity</button>
//       <table>
//         <thead>
//           <tr>
//             <th>Time</th>
//             <th>Price</th>
//             <th>Quantity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               <td>{item.time}</td>
//               <td>{item.price}</td>
//               <td>{item.quantity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;












// import React, { useState, useEffect } from 'react';
// import { useTable, Column } from 'react-table';

// interface TickerData {
//   E: number;
//   c: string;
//   o: string;
//   h: string;
//   l: string;
//   v: string;
//   q: string;
// }

// const App: React.FC = () => {
//   const [pair, setPair] = useState<string>('btcusdt');
//   const [tickerData, setTickerData] = useState<TickerData | null>(null);

//   useEffect(() => {
//     const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@ticker`);

//     ws.onmessage = (event) => {
//       const data: TickerData = JSON.parse(event.data);
//       setTickerData(data);
//     };

//     return () => {
//       ws.close();
//     };
//   }, [pair]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPair(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//   };

//   const columns: Column[] = React.useMemo(
//     () => [
//       {
//         Header: 'Metric',
//         accessor: 'metric', 
//       },
//       {
//         Header: 'Value',
//         accessor: 'value',
//       },
//     ],
//     []
//   );

//   const data = React.useMemo(() => {
//     return tickerData
//       ? [
//           { metric: 'Event Time', value: new Date(tickerData.E).toLocaleString() },
//           { metric: 'Close Price', value: tickerData.c },
//           { metric: 'Open Price', value: tickerData.o },
//           { metric: 'High Price', value: tickerData.h },
//           { metric: 'Low Price', value: tickerData.l },
//           { metric: 'Base Asset Volume', value: tickerData.v },
//           { metric: 'Quote Asset Volume', value: tickerData.q },
//         ]
//       : [];
//   }, [tickerData]);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({ columns, data });

//   return (
//     <div>
//       <h1>Binance Market Data</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={pair} onChange={handleChange} />
//         <button type="submit">Fetch Data</button>
//       </form>
//       {tickerData && (
//         <div>
//           <h2>Ticker Data for {pair.toUpperCase()}</h2>
//           <table {...getTableProps()}>
//             <thead>
//               {headerGroups.map(headerGroup => (
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                   {headerGroup.headers.map(column => (
//                     <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {rows.map(row => {
//                 prepareRow(row);
//                 return (
//                   <tr {...row.getRowProps()}>
//                     {row.cells.map(cell => {
//                       return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
//                     })}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// App.tsx
import React, { useState, useEffect } from 'react';
import RecentTradesTable from './components/RecentTradesTable';
import axios from 'axios';

const App: React.FC = () => {
  const [pair, setPair] = useState<string>('btcusdt');
  const [ticker, setTicker] = useState<any>(null);
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    const wsTicker = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@ticker`);
    wsTicker.onmessage = (event) => {
      setTicker(JSON.parse(event.data));
    };

    axios.get(`https://api.binance.com/api/v3/trades?symbol=${pair.toUpperCase()}`)
      .then(response => {
        setTrades(response.data);
      })
      .catch(error => {
        console.error('Error fetching trade data:', error);
      });

    return () => {
      wsTicker.close();
    };
  }, [pair]);

  return (
    <div>
      <h1>Binance Market Data</h1>
      <form>
        <label>
          Select Trading Pair:
          <select value={pair} onChange={(e) => setPair(e.target.value)}>
            <option value="btcusdt">BTCUSDT</option>
            <option value="ethusdt">ETHUSDT</option>
            <option value="xrpusdt">XRPUSDT</option>
          </select>
        </label>
      </form>

      {ticker && <h2>Current Price: {ticker.c}</h2>}

      {trades.length > 0 && (
        <div>
          <h2>Recent Trades</h2>
          <RecentTradesTable trades={trades} />
        </div>
      )}
    </div>
  );
};

export default App;
