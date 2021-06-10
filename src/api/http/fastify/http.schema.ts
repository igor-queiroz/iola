import { RequestGenericInterface } from 'fastify'
import { RouteShorthandOptions } from 'fastify/types/route'
import S from 'fluent-json-schema'
import { EnumUtil, MessageFormat } from '../../../core/common'
import { SocketEventType } from '../../../core/socket'

// Schemas

export const Message = S
  .object()
  .title('Message')
  .prop('id', S.number())
  .prop('type', S.enum([SocketEventType.ReceivedMessage, SocketEventType.SentMessage]))
  .prop('date', S.string())
  .prop('message', S.object()
    .prop('format', S.enum(EnumUtil.values(MessageFormat)))
    .prop('message', S.oneOf([
      S.string(),
      S.number(),
      S.boolean(),
      S.array().additionalItems(true),
      S.object().additionalProperties(true)
    ]))
  )

export const MessageList = S
  .array()
  .items(Message)

export const GetMessage = S
  .object()
  .prop('id', S.string())

export const GetMessageList = S
  .object()
  .prop('type', S.oneOf([
    S.enum(EnumUtil.values(SocketEventType)),
    S.array().items(S.enum(EnumUtil.values(SocketEventType))),
  ]))

export const SendMessage = S
  .object()
  .prop('format', S.enum(EnumUtil.values(MessageFormat)).required())
  .prop('event', S.string().description('Used only for SocketIO client. Ignored for other client types'))
  .prop('data', S.oneOf([
    S.string(),
    S.number(),
    S.boolean(),
    S.array(),
    S.object(),
  ]).required())

// Route options

export const GetMessageRouteOptions: RouteShorthandOptions = {
  schema: {
    params: GetMessage,
    response: {
      200: Message,
      404: S.object(),
    },
  }
}

export const GetMessageListRouteOptions: RouteShorthandOptions = {
  schema: {
    querystring: GetMessageList,
    response: {
      200: MessageList,
    },
  }
}

export const SendMessageRouteOptions: RouteShorthandOptions = {
  schema: {
    body: SendMessage,
    response: {
      200: S.object(),
    },
  }
}

// Interfaces

export interface GetMessageRequest extends RequestGenericInterface {
  Params: {
    id: string
  }
}

export interface GetMessageListRequest extends RequestGenericInterface {
  Querystring: {
    type: SocketEventType|SocketEventType[]
  }
}

export interface SendMessageRequest extends RequestGenericInterface {
  Body: {
    format: MessageFormat,
    data: any,
    event?: string,
  }
}
