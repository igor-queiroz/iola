import { RequestGenericInterface } from 'fastify'
import { RouteShorthandOptions } from 'fastify/types/route'
import S from 'fluent-json-schema'

import { EnumUtil } from '@iola/core/common'
import { SocketEventType } from '@iola/core/socket'

// Schemas

const Error = S
  .object()
  .prop('statusCode', S.number())
  .prop('error', S.string())
  .prop('message', S.string())

export const Message = S
  .object()
  .prop('id', S.number().required())
  .prop('type', S.string().enum(EnumUtil.values(SocketEventType)).required())
  .prop('date', S.string().required())
  .prop('message', S.anyOf([
    S.string(),
    S.number(),
    S.boolean(),
    S.array().items(S.raw({})).additionalItems(true),
    S.object().additionalProperties(true),
    S.null()
  ]).raw({nullable: true}))

export const MessageList = S
  .array()
  .items(Message)

export const GetMessage = S
  .object()
  .prop('id', S.string().required())

export const GetMessageList = S
  .object()
  .prop('type', S.array().items(S.string().enum(EnumUtil.values(SocketEventType))))

export const SendMessage = S.oneOf([
  S.object()
    .description('Send any data (string, number, boolean, array, object, null).')
    .prop('event', S.string().description('Used only for SocketIO client.'))
    .prop('data', S.anyOf([
      S.string().raw({nullable: true}),
      S.number().raw({nullable: true}),
      S.boolean().raw({nullable: true}),
      S.array().items(S.raw({})),
      S.object(),
    ]).required()),

  S.object()
    .description('Send binary data as uint8 array (octets).')
    .prop('event', S
      .string()
      .description('Used only for SocketIO client.'))
    .prop('bytes', S
      .array()
      .items(S.number().minimum(0).maximum(255))
      .required())
])

export const SendMessageResponse = S
  .object()
  .prop('messageId', S.number().required())
  .prop('reply', S.object().additionalProperties(true))

// Route options

export const GetMessageRouteOptions: RouteShorthandOptions = {
  schema: {
    description: 'Get message by id',
    tags: ['Message'],
    params: GetMessage,
    response: {
      200: Message,
      400: Error,
      404: Error,
      500: Error,
    },
  }
}

export const GetMessageListRouteOptions: RouteShorthandOptions = {
  schema: {
    description: 'Get message list',
    tags: ['Message'],
    querystring: GetMessageList,
    response: {
      200: MessageList,
      400: Error,
      500: Error,
    },
  }
}

export const SendMessageRouteOptions: RouteShorthandOptions = {
  schema: {
    description: 'Send message',
    tags: ['Message'],
    body: SendMessage,
    response: {
      200: SendMessageResponse,
      400: Error,
      500: Error,
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
  Body: SendMessageBodyWithData | SendMessageBodyWithBytes
}

export interface SendMessageBodyWithData {
  data: any,
  event?: string,
}

export interface SendMessageBodyWithBytes {
  bytes: number[],
  event?: string,
}
