import { paramCase } from 'change-case'

export const transformParamCase = (value?: any) => {
  return typeof value === 'string' ? paramCase(value.trim()) : value
}
