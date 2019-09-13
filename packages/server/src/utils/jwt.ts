import * as jwt from 'jsonwebtoken'
import { config } from '../config'

/**
 * Encode data into a JWT token.
 */
export const encode = (
  data: string | object | Buffer,
  options?: jwt.SignOptions
): string => {
  return jwt.sign(data, config.token.secret, options)
}

/**
 * Decode data from a JWT token.
 */
export const decode = (token: string): string | object => {
  return jwt.verify(token, config.token.secret)
}
