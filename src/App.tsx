import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTable } from './stores/actions';
import styled from 'styled-components';
import OneDayTrades from './components/OneDayTradesTable';
import RecentTrades from './components/RecentTradesTable';
import Header from './components/Header';
import Footer from './components/Footer';
import backgroundImage from './asset/background.jpg';
import { currencyPairs } from './configs/currencyPairs';
import { AppContainer, Input, Dropdown, Button, InputContainer } from './components/StyledComponents';

const App: React.FC = () => {
  const [currencyPair, setCurrencyPair] = useState('BTCUSDT');
  const [oneDayTrades, setOneDayTrades] = useState(null);
  const [recentTrades, setRecentTrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPairs, setFilteredPairs] = useState(currencyPairs);

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

    return () => {
      ws.close();
    };

  }, [currencyPair]);

  useEffect(() => {
    setFilteredPairs(
      currencyPairs.filter((pair) => 
        pair.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <AppContainer>
     <Header />
     <InputContainer>
      <Input 
        type="text" 
        placeholder="Search for a currency pair" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Dropdown onChange={(e) => setCurrencyPair(e.target.value)} value={currencyPair}>
        {filteredPairs.map((pair, index) => (
          <option key={index} value={pair.value}>{pair.label}</option>
        ))}
      </Dropdown>

      <Dropdown onChange={handleTableChange}>
        <option value="RECENT_TRADES">Recent Trades</option>
        <option value="TICKER_24H">24h Ticker Data</option> 
      </Dropdown>
      </InputContainer>

      {activeTable === 'RECENT_TRADES' && recentTrades.length > 0 && <div key={currencyPair}> <RecentTrades data={recentTrades} /></div>}
      {activeTable === 'TICKER_24H' && oneDayTrades !== null && <div> <OneDayTrades data={oneDayTrades} /> </div>}
     <Footer />
    </AppContainer>
  );
};

export default App;

