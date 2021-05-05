const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const path = require('path')
const ws = new WebSocket.Server({ port: 8088 });
var msg;

ws.on('connection', function connection(ws) 
{
  setInterval(() => {
     ws.send('ws Chat room is working!');
  })
});

