import * as Authpack from '@authpack/sdk'

if (!window) {
  throw new Error('Please ensure Authpack scripts are inserted in a browser')
}

window.addEventListener('load', () => {
  console.log('Hello world!')
})
