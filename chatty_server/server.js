const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

const PORT = 3001;

const server = express()
  .use(express.static('./'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

//updates user count when client connects to the server
function updateUserCount(count) {
  const userUpdate = {
    type: 'updateUserCount',
    username: 'ChattyBot',
    content: 'A Chatter entered the room!',
    count: count
  };
  wss.broadcast(userUpdate);
}
//updates user count when user disconnects from server
function userDisconnected(count) {
  const userUpdate = {
    type: 'userDisconnected',
    username: 'ChattyBot',
    content: 'A Chatter left!',
    count: count
  }
  wss.broadcast(userUpdate);
}
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  updateUserCount(wss.clients.size);
  
  //accepts message from client side App file and adds uuid id and then brodcasts it back to the App file
  ws.on('message', (message) => {
    const incomingClientMessage = JSON.parse(message);
    incomingClientMessage.id = uuidv4();  
    wss.broadcast(incomingClientMessage);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    userDisconnected(wss.clients.size);
  });
});

wss.broadcast = function broadcast(data) {
  const stringified = JSON.stringify(data);
  wss.clients.forEach(function each(client) {
    if(client.readyState === WebSocket.OPEN) {
      client.send(stringified);
    }
  });
};
