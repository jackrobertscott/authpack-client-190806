const localhost = document.location.hostname.includes('localhost')

export const createConfig = (debug: boolean = false) => {
  return {
    localhost,
    debug: debug && localhost,
    urls: {
      plugin:
        debug && localhost
          ? 'http://localhost:3100'
          : 'https://gadgets.v1.authpack.io',
      api:
        debug && localhost
          ? 'http://localhost:4000'
          : 'https://api.v1.authpack.io',
    },
  }
}

export const config = createConfig(false)
