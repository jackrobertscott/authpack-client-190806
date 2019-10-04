import { settingsStore } from './settings'

export const chat = (data: { [key: string]: any }) =>
  fetch('http://localhost:4000', {
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
  }).then(response => response.json())
