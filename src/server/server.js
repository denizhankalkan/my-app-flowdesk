const WebSocket = require('ws');

const binanceWebSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

binanceWebSocket.on('message', (message) => {
  const data = JSON.parse(message);
  console.log(data);
});

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
