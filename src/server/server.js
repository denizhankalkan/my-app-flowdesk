// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', (ws) => {
//     console.log("geldik");
//   setInterval(() => {
//     ws.send(JSON.stringify({
//       price: Math.floor(Math.random() * 1000)
//     }));
//   }, 1000);
// });

const WebSocket = require('ws');

// Binance WebSocket endpoint
const binanceWebSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

binanceWebSocket.on('message', (message) => {
  const data = JSON.parse(message);
  console.log("24hr Ticker Price Change Statistics:", data);
});

// Start your own WebSocket server to broadcast this data
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  binanceWebSocket.on('message', (message) => {
    const data = JSON.parse(message);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  });
});
