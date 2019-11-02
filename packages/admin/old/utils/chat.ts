import { gadgets } from './wga'

export interface IData {
  [key: string]: any
}

export const chat = (data: IData) => {
  return fetch('http://localhost:4000', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        gadgets.state && gadgets.state.token
          ? `Bearer ${gadgets.state.token}`
          : '',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .catch(error => {
      console.warn(error)
      throw error
    })
}
