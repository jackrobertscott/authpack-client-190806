import { gadgets } from './wga'

export const chat = (data: { [key: string]: any }) =>
  fetch('http://localhost:4000', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        gadgets.state && gadgets.state.token
          ? `Bearer ${gadgets.state.token}`
          : '',
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
