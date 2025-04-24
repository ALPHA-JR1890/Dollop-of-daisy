const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 3000 });

console.log('WebSocket server is running on ws://localhost:3000');

// Broadcast a message to all connected clients
function broadcast(data, sender) {
  wss.clients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Listen for client connections
wss.on('connection', (ws) => {
  console.log('A new client connected');

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log('Received:', message);

    // Broadcast the message to all other clients
    broadcast(message, ws);
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('A client disconnected');
  });
});
