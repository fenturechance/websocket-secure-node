const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
let app = express();
let router = express.Router();
let port = 443;
var fs = require('fs');
var https = require('https');
let path = require('path')

var hskey = fs.readFileSync(path.join(__dirname, '../ssl/private.key'));
var hscert = fs.readFileSync(path.join(__dirname, '../ssl/certificate.crt'));

var credentials = {
    key: hskey,
    cert: hscert
};

app.use(express.static(__dirname + '/dist'));

router.get('/', function (req, res, next) {
  res.sendFile('index.html', {root: __dirname + "/dist"});
});

app.use('/', router);

https.createServer(credentials, app).listen(port);
