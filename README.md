<h1 align="center">🔄 iola</h1> 

<p align="center">
  <a href="https://github.com/pvarentsov/iola/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/pvarentsov/iola" alt="license" />
  </a>
  <a href="https://www.npmjs.com/package/iola">
    <img src="https://img.shields.io/npm/v/iola.svg" alt="npm" />
  </a>
  <a href="https://www.npmjs.com/package/iola">
    <img src="https://img.shields.io/npm/dt/iola.svg" alt="downloads" />
  </a>
</p>

<details>
  <summary><b>Table of contents</b> (click to open)</summary>
  <br>
  <ul>
    <li><a href="https://github.com/pvarentsov/iola#description">Description</a></li>
    <li><a href="https://github.com/pvarentsov/iola#installation">Installation</a></li>
    <li><a href="https://github.com/pvarentsov/iola#usage">Usage</a></li>
    <ul>
      <li><a href="https://github.com/pvarentsov/iola#cli">CLI</a></li>
      <li><a href="https://github.com/pvarentsov/iola#rest-api">Rest API</a></li>
    </ul>
    <li><a href="https://github.com/pvarentsov/iola#clients">Clients</a></li>
      <ul>
        <li><a href="https://github.com/pvarentsov/iola#common">Common</a></li>
        <li><a href="https://github.com/pvarentsov/iola#websocket">WebSocket</a></li>
        <li><a href="https://github.com/pvarentsov/iola#socketio">Socket.IO</a></li>
        <li><a href="https://github.com/pvarentsov/iola#tcp--unix-socket">TCP & Unix socket</a></li>
      </ul>
    <li><a href="https://github.com/pvarentsov/iola#license">License</a></li>
  </ul>
</details>

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
- [x] Implement clients
  - [x] WebSocket
  - [x] Socket.IO
  - [x] Tcp
  - [x] Unix-socket
- [ ] Add application's binaries for all popular platforms


## Installation
```bash
$ npm install -g iola
```
## Usage

### CLI

<pre>
$ iola --help

<b>iola</b> - a socket client with rest api

Usage: iola [options] [command]

Options:
  -v, --version                     Display version
  -h, --help                        Display help

Commands:
  websocket|ws [options] &lt;address>  Run websocket client
  socketio|io [options] &lt;address>   Run socket.io client
  tcp [options] &lt;address>           Run tcp client
  unix [options] &lt;address>          Run unix client
  help [command]                    Display help for command

API:
  GET  /messages                    Get message list
  GET  /messages/{id}               Get message by id
  POST /messages                    Send message 
  GET  /docs                        Get api documentation
</pre>

### Rest API

<p align="center">
  <img src="./docs/swagger.png">
</p>

<details>
  <summary>get message</summary>
  <p align="center">
    <br>
    <img src="./docs/get-message.png">
  </p>
</details>

<details>
  <summary>get message list</summary>
  <p align="center">
    <br>
    <img src="./docs/get-message-list.png">
  </p>
</details>


<details>
  <summary>send any data</summary>
  <p align="center">
    <br>
    <img src="./docs/send-any-data.png">
  </p>
</details>

<details>
  <summary>send binary data (uint8 array)</summary>
  <p align="center">
    <br>
    <img src="./docs/send-bytes.png">
  </p>
</details>

## Clients

### Common

All socket clients have the next options:

<table border="0">
<tr>
  <td nowrap><code>--api-port &lt;port&gt;</code></td>
  <td>Set API port (default: "3000").</td>
</tr>
<tr>
  <td nowrap><code>--api-host &lt;host&gt;</code></td>
  <td>Set API host (default: "127.0.0.1").</td>
</tr>
<tr>
  <td nowrap><code>--binary-encoding  &lt;encoding&gt;</code></td>
  <td>Encode <code>sent</code>/<code>received</code> binary messages for more readability. Supported encodings: 
    <code>ascii</code>,
    <code>utf8</code>,
    <code>base64</code>,
    <code>hex</code>.
    <br>
    <br>
    <img src="./docs/binary-encoding.cli.png">
    <br>
    <br>
    <img src="./docs/binary-encoding.rest-api.png">
  </td>
</tr>
<tr>
  <td nowrap><code>--no-emoji</code></td>
  <td>Disable emoji in the console.</td>
</tr>
</table>

### WebSocket

<pre>
$ iola help websocket

Usage: iola websocket [options] <address>

Run websocket client

Options:
  -ap, --api-port &lt;port>             Set api port (default: "3000")
  -ah, --api-host &lt;host>             Set api host (default: "127.0.0.1")
  -rt, --reply-timeout &lt;timeout>     Set reply timeout in ms (default: "1000")
  -be, --binary-encoding &lt;encoding>  Set binary encoding (choices: "ascii","utf8","base64","hex")
  -ne, --no-emoji                    Disable emoji
  -h, --help                         Display help

Examples:
  iola websocket ws://127.0.0.1:8080
  iola ws ws://127.0.0.1:8080/?token=secret
  iola websocket ws://127.0.0.1:8080 --binary-encoding utf8
  iola websocket ws://127.0.0.1:8080 --reply-timeout 3000 --no-emoji
</pre>

<details>
  <summary>message formats</summary>
  <br>
  <ul>
    <li><code>string</code></li>
    <li><code>json</code></li>
    <li><code>byte-array</code></li>
  </ul>
</details>

<details>
  <summary>server reply</summary>
  <br>
  <p>You can pass the RequestId to the request with json data
     in order to await the server reply with such RequestId in the reply data.
  </p>
  <p align="center">
    <br>
    <img src="./docs/send-data-with-requsetid.ws.png">
  </p>
  <p>RequestId field can be one of the following:
    <ul>
      <li><code>requestId</code></li>
      <li><code>request_id</code></li>
      <li><code>reqId</code></li>
      <li><code>req_id</code></li>
      <li><code>traceId</code></li>
      <li><code>trace_id</code></li>
    </ul>
  </p>
  <p>
    Default reply timeout is 1000 ms. To change it you can set <code>--reply-timeout &lt;timeout&gt</code> option.
  </p>
</details>

### Socket.IO

**iola** relies on Socket.IO v4. Please check a [version compatibility](https://socket.io/docs/v4/client-installation/#Version-compatibility).

<pre>
$ iola help socketio
 
Usage: iola socketio|io [options] <address>

Run socket.io client

Options:
  -ap, --api-port &lt;port>             Set api port (default: "3000")
  -ah, --api-host &lt;host>             Set api host (default: "127.0.0.1")
  -a, --auth &lt;key:value...>          Set authentication payload
  -t, --transport &lt;transport>        Set transport (choices: "polling","websocket")
  -rt, --reply-timeout &lt;timeout>     Set reply timeout in ms (default: "1000")
  -be, --binary-encoding &lt;encoding>  Set binary encoding (choices: "ascii","utf8","base64","hex")
  -ne, --no-emoji                    Disable emoji
  -h, --help                         Display help

Examples: 
  iola socketio http://127.0.0.1:8080 
  iola io http://127.0.0.1:8080/?token=secret --transport websocket
  iola io http://127.0.0.1:8080 --auth user:iola pass:qwerty1
  iola socketio http://127.0.0.1:8080 --binary-encoding utf8 
  iola socketio http://127.0.0.1:8080 --reply-timeout 3000 --no-emoji
</pre>

<details>
  <summary>message formats</summary>
  <br>
  <ul>
    <li><code>string</code></li>
    <li><code>number</code></li>
    <li><code>boolean</code></li>
    <li><code>null</code></li>
    <li><code>json</code></li>
    <li><code>byte-array</code></li>
  </ul>
</details>

<details>
  <summary>transport</summary>
  <br>
  <p>
    Client supports "websocket" and "polling" transports. It tries to use "websocket" first, if available.
  </p>
  <p>
    You can explicitly set the type of transport using <code>--transport &lt;transport></code> option.
  </p>
</details>

<details>
  <summary>auth</summary>
  <br>
  <p>
    Socket.IO client can send credentials with the <a href="https://socket.io/docs/v4/middlewares/#Sending-credentials">auth option</a>.
  </p>
  <p>
    You can set the auth payload using <code>--auth &lt;key:value...></code> option. Examples:
    <ul>
      <li><code>iola io http://127.0.0.1:8080 --auth user:iola pass:qwerty1</code></li>
      <li><code>iola io http://127.0.0.1:8080 --auth token:"super secret"</code></li>
    </ul>
  </p>
</details>

<details>
  <summary>send data</summary>
  <br>
  <p>Send any data</p>
  <p align="center">
    <br>
    <img src="./docs/emit-data.rest-api.png">
  </p>
  <p>Send binary data</p>
  <p align="center">
    <br>
    <img src="./docs/emit-bytes.rest-api.png">
  </p>
</details>

<details>
  <summary>server reply</summary>
  <br>
  <p>
    Socket.IO supports server replies. This feature is named acknowledgements.
  </p>
  <p align="center">
    <br>
    <img src="./docs/send-data-with-requsetid.io.png">
  </p>
  <p>
    Default reply timeout is 1000 ms. To change it you can set <code>--reply-timeout &lt;timeout&gt</code> option.
  </p>
</details>

### TCP & Unix socket

TCP and Unix socket clients have the same api. 

**TCP**

<pre>
$ iola help tcp
 
Usage: iola tcp [options] <address>

Run tcp client

Options:
  -ap, --api-port &lt;port>             Set api port (default: "3000")
  -ah, --api-host &lt;host>             Set api host (default: "127.0.0.1")
  -s, --sync                         Enable sync mode
  -rt, --reply-timeout &lt;timeout>     Set reply timeout in ms (sync mode only) (default: "1000")
  -be, --binary-encoding &lt;encoding>  Set binary encoding (choices: "ascii","utf8","base64","hex")
  -ne, --no-emoji                    Disable emoji
  -h, --help                         Display help

Examples: 
  iola tcp 127.0.0.1:8080
  iola tcp 127.0.0.1:8080 --sync
  iola tcp 127.0.0.1:8080 --binary-encoding utf8 
  iola tcp 127.0.0.1:8080 --no-emoji

</pre>

**Unix socket**

<pre>
$ iola help unix
 
Usage: iola unix [options] <address>

Run unix client

Options:
  -ap, --api-port &lt;port>             Set api port (default: "3000")
  -ah, --api-host &lt;host>             Set api host (default: "127.0.0.1")
  -s, --sync                         Enable sync mode
  -rt, --reply-timeout &lt;timeout>     Set reply timeout in ms (sync mode only) (default: "1000")
  -be, --binary-encoding &lt;encoding>  Set binary encoding (choices: "ascii","utf8","base64","hex")
  -ne, --no-emoji                    Disable emoji
  -h, --help                         Display help

Examples: 
  iola unix ./unix.sock
  iola unix ./unix.sock --sync
  iola unix ./unix.sock --binary-encoding utf8 
  iola unix ./unix.sock --no-emoji

</pre>

Clients support async and sync modes and use async mode by default.

In async mode, the client and the server exchange messages independently within one connection.

Sync mode uses a request/response protocol. The client opens a new connection for each request, the server responds.
The connection is closed either on the server side after a successful response or by a timeout on the client side.

<details>
  <summary>message formats</summary>
  <br>
  <ul>
    <li><code>byte-array</code></li>
  </ul>
</details>

<details>
  <summary>sync mode</summary>
  <br>
  <p>
    To enable sync mode need to set <code>--sync</code> option.
  </p>
</details>

<details>
  <summary>server reply</summary>
  <br>
  <p>
    Server replies are supported only in sync mode. If the server does not close the connection, the client will close it on its own during the reply timeout.
  </p>
  <p align="center">
    <br>
    <img src="./docs/send-data-with-requsetid.tcp.png">
  </p>
  <p>
    Default reply timeout is 1000 ms. To change it you can set <code>--reply-timeout &lt;timeout&gt</code> option.
  </p>
</details>

## License

This project is licensed under the [MIT License](https://github.com/pvarentsov/iola/blob/main/LICENSE).
