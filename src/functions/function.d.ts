interface Result {
  isBase64Encoded?: boolean
  headers?: any
  statusCode: number
  body: string
}

export interface Callack {
  (arg0: Error | null, result: Result): void
}

export interface Event {
  path: string,
  httpMethod: string
  headers: any
  queryStringParameters: any
  body: string
  isBase64Encoded: boolean
}
