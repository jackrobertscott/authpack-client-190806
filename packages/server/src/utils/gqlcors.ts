import { RequestHandler } from 'micro'

export interface ICorsOptions {
  origin?: string
  age?: string
}

export const gqlcors = (options: ICorsOptions = {}) => {
  return (handler: RequestHandler): RequestHandler => {
    return (req, res) => {
      const allowedAge = 60 * 60 * 24 // 24 hours
      const allowedMethods = ['POST', 'OPTIONS']
      const allowedHeaders = [
        'Access-Control-Allow-Origin',
        'Content-Type',
        'Authorization',
        'Accept',
      ]
      res.setHeader('Access-Control-Allow-Origin', options.origin || '*')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(','))
      res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(','))
      res.setHeader('Access-Control-Max-Age', String(allowedAge))
      return handler(req, res)
    }
  }
}
