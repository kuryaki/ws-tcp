#!/usr/bin/env node
var argv = require('optimist')
  .usage('Usage: $0 -port [port] -connect [host:port]')
  .demand(['port','connect'])
  .argv;

var remote = argv.connect.split(':');

var net = require('net');

var WebSocketServer = require('ws').Server;
var websocket = require('websocket-stream');
var wss = new WebSocketServer({port: argv.port});

wss.on('error', function(){
  console.log('error');
  console.log(arguments);
});

wss.on('clientError', function(){
  console.log('clientError');
  console.log(arguments);
});

wss.on('request', function(){
  console.log('request');
  console.log(arguments);
});

wss.on('listening', function(){
  console.log('Listening %s:%s proxied at ws://localhost:%s', remote[0], remote[1], argv.port);
});

wss.on('upgrade', function(){
  console.log('upgrade');
  console.log(arguments);
});


wss.on('connection', function(ws) {

  console.log(ws.protocol);

  var socket = net.connect({host:remote[0], port: remote[1]});
  socket.setEncoding('utf8');

  var stream = websocket(ws);

  stream.pipe(socket).pipe(stream);
  if('ws-tcp' == process.env.DEBUG){
    socket.pipe(process.stdout);
    stream.pipe(process.stdout);
  }
})