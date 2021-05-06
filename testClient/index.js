const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
let app = express();
let router = express.Router();
let port = 443;
var fs = require('fs');
var https = require('https');
let path = require('path')

var credentials = {
  //cert: fs.readFileSync(path.join(__dirname, '../ssl/certificate.crt')),
  cert: fs.readFileSync(path.join(__dirname, '../ssl/fullchain.pem')),
  //key: fs.readFileSync(path.join(__dirname, '../ssl/private.key'))
  key: fs.readFileSync(path.join(__dirname, '../ssl/privkey.pem'))
};

app.use(express.static(__dirname + '/dist'));

router.get('/', function (req, res, next) {
  res.sendFile('index.html', {root: __dirname + "/dist"});
});

app.use('/', router);

const wsProxy = createProxyMiddleware(
  '/someurl',
  {
      target: 'https://192.168.86.71:8089',
      changeOrigin: true,
      ws: true,
      pathRewrite: {
          '^/someurl' : '',
      },
      logLevel: 'debug',
      secure: false,
      onProxyReq(proxyReq, req, rsp) {
          console.log(proxyReq);
      },
      onProxyReq() {
        console.log('123')
      }
  }
)


app.use(wsProxy)

const server = https.createServer(credentials, app).listen(port);
server.on('upgrade', wsProxy.upgrade);
