const WebSocket = require('ws');

const setupWebSocketServer = (httpServer) => {
  const wss = new WebSocket.Server({ server: httpServer });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
      console.log('Received message:', message);

      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  console.log('WebSocket server running');
};

module.exports = setupWebSocketServer;
