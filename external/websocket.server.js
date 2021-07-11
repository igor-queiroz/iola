const WebSocket = require('ws')
const util = require('util')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  ws.on('message', data => {
    const message = data.toString()
    let json = undefined

    try {
      json = JSON.parse(message)
    } catch (err) {}

    if (json) {
      const requestIdInfo = findRequestId(json)

      if (requestIdInfo) {
        ws.send(JSON.stringify({
          [requestIdInfo.key]: requestIdInfo.value,
          message: 'reply on request'
        }))
      }
    }
  })

  setTimeout(() => {
    ws.send('Hi, Iola!')
    ws.send(Buffer.from('Hello'))
  }, 2_000)
})

function findRequestId(message) {
  const requestIdKeys = [
    'requestid',
    'request_id',
    'reqid',
    'req_id',
    'traceid',
    'trace_id',
  ]

  let requestIdKey

  if (typeof message === 'object' && message !== null && !Array.isArray(message)) {
    Object.keys(message).forEach(key => {
      if (requestIdKeys.includes(key.toLowerCase())) {
        requestIdKey = key
      }
    })
  }

  return requestIdKey
    ? {key: requestIdKey, value: message[requestIdKey]}
    : undefined
}
