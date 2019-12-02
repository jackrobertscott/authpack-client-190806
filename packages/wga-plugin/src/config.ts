const localhost = document.location.hostname.includes('localhost')

export const config = {
  localhost,
  debug: localhost,
  urls: {
    plugin: localhost
      ? 'http://localhost:3100'
      : 'https://gadgets.v1.authpack.io',
    api: localhost ? 'http://localhost:4000' : 'https://api.v1.authpack.io',
  },
}
