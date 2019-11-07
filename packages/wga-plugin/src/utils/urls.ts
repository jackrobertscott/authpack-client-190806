export const pluginUrl = () =>
  document.location.hostname.includes('localhost')
    ? 'http://localhost:3100'
    : 'https://plugin.wga.windowgadgets.io'

export const apiUrl = () =>
  document.location.hostname.includes('localhost')
    ? 'http://localhost:3100'
    : 'https://plugin.wga.windowgadgets.io'
