import { Authpack } from '@authpack/sdk'

declare global {
  interface Window {
    Authpack: any
  }
}

window.Authpack = Authpack
