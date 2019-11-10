export const pluginUrl = () =>
  document.location.hostname.includes('localhost')
    ? 'http://localhost:3100'
    : 'https://gadgets.v1.windowgadgets.io'

export const apiUrl = () =>
  document.location.hostname.includes('localhost')
    ? 'http://localhost:4000'
    : 'https://api.v1.windowgadgets.io'
