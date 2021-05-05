const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
let app = express();
let router = express.Router();
let port = 443;
var fs = require('fs');
var https = require('https');
let path = require('path')

var hskey = fs.readFileSync(path.join(__dirname, '../self-ssl/server.key'));
//var hskey = fs.readFileSync(path.join(__dirname, '../ssl/private.key'));
var hscert = fs.readFileSync(path.join(__dirname, '../self-ssl/server.crt'));
//var hscert = fs.readFileSync(path.join(__dirname, '../ssl/certificate.crt'));

var credentials = {
    key: hskey,
    cert: hscert
};

app.use(express.static(__dirname + '/dist'));

router.get('/', function (req, res, next) {
  res.sendFile('index.html', {root: __dirname + "/dist"});
});

app.use('/', router);

const wsProxy = createProxyMiddleware(
  '/someurl',
  {
      target: 'https://104.199.221.76:8089',
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
