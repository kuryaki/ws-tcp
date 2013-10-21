#!/usr/bin/env node
var argv = require('optimist')
  .usage('Usage: $0 -port [port] -connect [host:port]')
  .demand(['port','connect'])
  .argv;

var remote = argv.connect.split(':');

var net = require('net');
var socket = net.connect({host:remote[0], port: remote[1]});
socket.setEncoding('utf8');

var WebSocketServer = require('ws').Server;
var websocket = require('websocket-stream');
var wss = new WebSocketServer({port: argv.port});

console.log('%s:%s proxied at ws://localhost:%s', remote[0], remote[1], argv.port);

wss.on('connection', function(ws) {
  var stream = websocket(ws);
  stream.pipe(socket).pipe(stream);
})