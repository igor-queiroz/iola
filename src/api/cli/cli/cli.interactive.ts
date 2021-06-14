import * as chalk from 'chalk'
import * as moment from 'moment'
import { EOL } from 'os'

import { CliConfig, ICliInteractive } from '@iola/api/cli'
import { IHttpServer } from '@iola/api/http'
import { MessageUtil } from '@iola/core/common'
import { ISocketClient, SocketEvent, SocketEventType } from '@iola/core/socket'

export class CliInteractive implements ICliInteractive {
  constructor(
    private readonly config: CliConfig
  ) {}

  async listen(server: IHttpServer, client: ISocketClient): Promise<void> {
    await client.connect()

    const address = await server
      .listen(this.config.apiHost, this.config.apiPort)

    console.log()
    console.log(`${chalk.bold('API server:')} ${address}`)
    console.log(`${chalk.bold('API docs  :')} ${address}/docs`)

    setTimeout(() => {
      client.store
        .listen()
        .subscribe(event => console.log(`${EOL}${this.parseEvent(event)}`))
    }, 1000)
  }

  private parseEvent(event: Required<SocketEvent>): string {
    const eventName: Record<SocketEventType, string> = {
      [SocketEventType.ReceivedMessage]: this.config.emoji ? '📥 Message received' : 'Message received',
      [SocketEventType.SentMessage]: this.config.emoji ? '📤 Message sent' : 'Message sent',
      [SocketEventType.Connected]: this.config.emoji ? '🔄 Connection established' : 'Connection established',
      [SocketEventType.Error]: this.config.emoji ? '✖️ Error' : 'Error',
      [SocketEventType.Closed]: this.config.emoji ? '🚫️ Connection closed' : 'Connection closed',
    }

    const id = chalk.bold(event.id.toString().padStart(5, '0'))
    const date = moment(event.date).format('YYYY-MM-D HH:mm:ss')
    const title = `${id} [${date}] ${eventName[event.type]}`

    const message = event.type === SocketEventType.Connected
      ? {type: event.message.type, address: event.message.address}
      : event.message

    let body = '  ' + MessageUtil
      .humanize(message)
      .replace(new RegExp(EOL, 'g'), `${EOL}  `)

    if (event.type === SocketEventType.Closed) {
      body += EOL
    }

    return `${title}:${EOL}${body}`
  }
}
