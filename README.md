## Websockets proxy to TCP socket

Usage

	git clone https://github.com/kuryaki/ws-tcp.git
	cd ws-tcp
	npm install
	./index.js --port 8080 --connect 127.0.0.1:1337

### Options

#### port

Port where the websocket will be served

#### connect

TCP Socket that is being proxied, you should ise "host:port" syntax