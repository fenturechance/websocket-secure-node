const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const path = require('path')
const server = new https.createServer({
  cert: fs.readFileSync(path.join(__dirname, '../ssl/certificate.crt')),
  key: fs.readFileSync(path.join(__dirname, '../ssl/private.key'))
});
const wss = new WebSocket.Server({ server });
var msg;

wss.on('connection', function connection(ws) 
{
  setInterval(() => {
     ws.send('Chat room is working!');
  })
});

server.listen(8089);
