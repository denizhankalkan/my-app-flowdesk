import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { HmacSHA256 } from 'crypto-js';
import Binance, { OrderType }  from 'binance-api-node';

interface MarketData {
  lastPrice: string;
  volume: string;
  highPrice: string;
  lowPrice: string;
}

interface Props {
  pair: string;
}

const MarketDataDisplay: React.FC<Props> = ({ pair }) => {
    const API_KEY = 'heTvmhgVt15bGu7cNwvtgqXrCYnpruROVt2BEL2tiyVZ8n9lyUspIZlSdIh1MOBD';
    const API_SECRET = 'BMy1sApcWgKpXYzQEgp2Uc6NiogrGvWmsu53UmDJPmQyD5LYNHHXhYyb8se0LHLa';
    const baseUrl = 'https://testnet.binance.vision';

    async function getAccountInfo() {
        // const timestamp = Date.now();
        // const queryString = `timestamp=${timestamp}`;
        // const signature = HmacSHA256(queryString, API_SECRET).toString();
        // const pair = "BTCUSDT";
      
        // try {
        //   const response = await axios.get(`${baseUrl}/api/v3/ticker/24hr?symbol=${pair}`, {
        //     headers: {
        //       'X-MBX-APIKEY': API_KEY,
        //     },
        //     params: {
        //       timestamp,
        //       signature,
        //     },

        //   });
        //   console.log("responseee", response);

        //   console.log(response.data);
      
        // } catch (error) {
        //   console.error('An error occurred:', error);
        // }

        const fetchData = async () => {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
    
          const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
    
          try {
            const response = await fetch("https://testnet.binance.vision/api/v3/exchangeInfo", requestOptions);
            const result = await response.json();  // Assuming server responds with json
            console.log(result);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
      }

  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);  // Added loading state

  useEffect(() => {
    console.log("buradayiz")
    setIsLoading(true);  // Set loading to true at the start of fetch
    // fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     setMarketData({
    //       lastPrice: data.lastPrice,
    //       volume: data.volume,
    //       highPrice: data.highPrice,
    //       lowPrice: data.lowPrice,
    //     });
    //     setIsLoading(false);  // Set loading to false once data is fetched
    //   })
    //   .catch(error => {
    //     console.error('There was a problem with the fetch operation:', error);
    //     setError(error.message);
    //     setIsLoading(false);  // Set loading to false if an error occurred
    //   });
    getAccountInfo();
   
    const Binance = require('binance-api-node').default;

    // Replace with your Binance API key
    const client = Binance({
      apiKey: 'heTvmhgVt15bGu7cNwvtgqXrCYnpruROVt2BEL2tiyVZ8n9lyUspIZlSdIh1MOBD',
      apiSecret: 'BMy1sApcWgKpXYzQEgp2Uc6NiogrGvWmsu53UmDJPmQyD5LYNHHXhYyb8se0LHLa',
    });
    
    // Replace with the symbol of the spot market you want to buy
    const symbol = 'BTCUSDT';
    
    // Replace with the quantity of the spot market you want to buy
    const quantity = 1;
    
    client.order({
      symbol: symbol,
      side: 'BUY',
      type: 'MARKET',
      quantity: quantity
    }).then(() => {
        console.log("data success");
      })
      .catch(() => {
        console.error(error);
      });


  }, [pair]);

  if (isLoading) { 
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!marketData) {
    return <div>No Data Available</div>;
  }

  return (
    <div>
      <h3>24-Hour Ticker</h3>
      <ul>
        <li>Last Price: {marketData.lastPrice}</li>
        <li>Volume: {marketData.volume}</li>
        <li>High Price: {marketData.highPrice}</li>
        <li>Low Price: {marketData.lowPrice}</li>
      </ul>
    </div>
  );
};

export default MarketDataDisplay;
