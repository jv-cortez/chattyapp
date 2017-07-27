const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4')
const WebSocket = require('ws');

const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('./'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
//const clients = [];
function updateUserCount(count) {
  console.log('count', count)
  const userUpdate = {
    type: "updateUserCount",
    count: count
  }
  wss.broadcast(userUpdate)
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  //clients.push(ws)
  console.log('Client connected');
  //after logging number of clients on App.jsx, add notifications everytime there is a new client connection " new user connected"
  updateUserCount(wss.clients.size)
  ws.on('message', (message) => {
    const incomingClientMessage = JSON.parse(message);
    incomingClientMessage.id = uuidv4();  
    wss.broadcast(incomingClientMessage);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    updateUserCount(wss.clients.size)
  });
});

wss.broadcast = function broadcast(data) {
  const stringified = JSON.stringify(data)
  wss.clients.forEach(function each(client) {
    if(client.readyState === WebSocket.OPEN) {
      client.send(stringified);
    }
  });
};
//broadcast current user count and when a client disconnects