import { settingsStore } from './settings'

export const chat = (data: { [key: string]: any }) =>
  fetch('http://localhost:3500', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        settingsStore.state.current && settingsStore.state.current.session.token
          ? `Bearer ${settingsStore.state.current.session.token}`
          : '',
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
