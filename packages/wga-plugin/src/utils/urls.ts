export const pluginUrl = () =>
  document.location.hostname.includes('localhost')
    ? 'http://localhost:3100'
    : 'https://gadgets.v1.authpack.io'

export const gqlUrl = () =>
  document.location.hostname.includes('localhost')
    ? 'http://localhost:4000'
    : 'https://api.v1.authpack.io'
