const localhost = document.location.hostname.includes('localhost')

export const config = {
  localhost,
  debug: localhost,
  urls: {
    plugin: localhost
      ? 'http://localhost:3100'
      : 'https://plugin.v1.windowgadgets.io',
    api: localhost
      ? 'http://localhost:4000'
      : 'https://api.v1.windowgadgets.io',
  },
}
