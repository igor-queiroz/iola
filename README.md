# iola

[![License: MIT](https://img.shields.io/github/license/pvarentsov/iola)](https://github.com/pvarentsov/iola/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/iola.svg)](https://www.npmjs.com/package/iola)

## Description

**iola** - a socket client with rest api. It helps to work with socket servers using your favorite rest client.

<p align="center"> 
  <img src="./demo/iola-demo.gif">
</p>

**Features:**

1. Read messages via rest api
2. Send messages via rest api
3. Log all socket events in console

**Roadmap**:
- [ ] Detailed documentation
- [ ] Implement clients
  - [x] WebSocket
  - [ ] SocketIO
  - [ ] Tcp
  - [ ] Unix-socket
- [ ] Add application's binaries for all popular platforms


## Installation
```bash
$ npm install -g iola
```
## Usage

<pre>
$ iola --help

<b>iola</b> - a socket client with rest api

Usage: iola [options] [command]

Options:
  --version                      Display version
  --help                         Display help

Commands:
  websocket [options] &lt;address>  Run websocket client
  help [command]                 Display help for command

API:
  GET  /messages                 Get message list
  GET  /messages/{id}            Get message by id
  POST /messages                 Send message 
  GET  /docs                     Get api documentation
</pre>

### WebSocket

<details>
  <summary>
    Usage
  </summary>
  <pre>
$ iola help websocket

Usage: iola websocket [options] &lt;address>

Run websocket client

Options:
  -ap, --api-port &lt;port>          Set api port (default: "3000")
  -ah, --api-host &lt;host>          Set api host (default: "127.0.0.1")
  -rt, --reply-timeout &lt;timeout>  Set reply timeout in ms (default: "2000")
  -ne, --no-emoji                 Disable emoji
  -h, --help                      Display help

Examples:
  iola websocket ws://127.0.0.1:8080
  iola websocket ws://127.0.0.1:8080 --reply-timeout 3000 --no-emoji

</pre>
</details>

## License

This project is licensed under the [MIT License](https://github.com/pvarentsov/iola/blob/main/LICENSE).
