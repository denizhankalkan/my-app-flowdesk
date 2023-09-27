import axios from 'axios';

const BASE_URL = "https://api.binance.com/api/v3";

export const getRecentTrades = async (symbol: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/trades?symbol=${symbol}&limit=20`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTicker24Hr = async (symbol: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/ticker/24hr?symbol=${symbol}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const initWebSocket = (symbol: string, callback: (data: any) => void) => {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);
  ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    callback(data);
  };
  return ws;
};
