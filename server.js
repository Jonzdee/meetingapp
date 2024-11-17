const WebSocket = require('ws');

// Create a WebSocket server
const server = new WebSocket.Server({ port: 3000 });

console.log('Signaling server running on ws://localhost:3000');

// Listen for new connections
server.on('connection', socket => {
  console.log('A user connected');

  // Handle messages from clients
  socket.on('message', message => {
    console.log('Received:', message);

    // Broadcast the message to all connected clients except the sender
    server.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnections
  socket.on('close', () => {
    console.log('A user disconnected');
  });
});
