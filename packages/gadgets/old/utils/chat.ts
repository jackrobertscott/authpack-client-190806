import { settingsStore } from './settings'

export interface IData {
  [key: string]: any
}

export const chat = (data: IData) => {
  return fetch('http://localhost:4000', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: [
        settingsStore.state.session &&
          `Bearer ${settingsStore.state.session.token}`,
        settingsStore.state.domain && settingsStore.state.domain.key,
      ]
        .filter(i => i && i.trim().length)
        .join(','),
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .catch(error => {
      console.warn(error)
      throw error
    })
}
