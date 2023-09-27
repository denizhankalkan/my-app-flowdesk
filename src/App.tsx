import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTable } from './stores/actions';
import OneDayTrades from './components/OneDayTradesTable';
import RecentTrades from './components/RecentTradesTable';
import Header from './components/Header';
import Footer from './components/Footer';
import Overview from './components/shared/overview';
import { currencyPairs } from './configs/currencyPairs';
import { 
  AppContainer, 
  Input, 
  Dropdown, 
  TableContainer, 
  InputContainer, 
  ContentContainer, 
  FlexContainer 
} from './components/StyledComponents';
import { getRecentTrades, getTicker24Hr, initWebSocket } from './services/service';


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
    const ws = initWebSocket(currencyPair, (data) => {
      console.log(data);
    });
  
    getRecentTrades(currencyPair).then(setRecentTrades).catch(console.error);
    getTicker24Hr(currencyPair).then(setOneDayTrades).catch(console.error);
  
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

    if (filteredPairs.length > 0) {
      setCurrencyPair(filteredPairs[0].value);
    }
  }, [searchTerm]);

  return (
    <AppContainer>
     <Header />
     <ContentContainer>
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

      <FlexContainer>
        <TableContainer>
          {activeTable === 'RECENT_TRADES' && recentTrades.length > 0 && <div key={currencyPair}> <RecentTrades data={recentTrades} /></div>}
          {activeTable === 'TICKER_24H' && oneDayTrades !== null && <div> <OneDayTrades data={oneDayTrades} /> </div>}
        </TableContainer>
        <Overview />
      </FlexContainer>
      </ContentContainer>
     <Footer />
    </AppContainer>
  );
};

export default App;
