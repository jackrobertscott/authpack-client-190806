export const chat = (data: { [key: string]: any }) =>
  fetch('http://localhost:3500', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(response => response.json())
