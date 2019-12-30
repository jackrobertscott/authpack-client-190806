import { Authpack } from '@authpack/sdk'

if (!window) {
  const message = `Please ensure Authpack scripts are used in a browser`
  throw new Error(message)
}
/**
 * Run initial events once the page has loaded.
 */
window.addEventListener('load', () => {
  const authpack = load()
  guard(authpack)
  open(authpack)
  replace(authpack)
})
/**
 * Locate the authpack script tag and initialise the authpack instance.
 */
const load = () => {
  const filename = 'index.js'
  const selector = `script[src="${filename}"]`
  const node: HTMLScriptElement = document.querySelector(selector)
  if (!node) {
    const message = `Authpack script tag not found i.e.:\n\n<script\n\tsrc="${filename}"\n\tdata-key="wga-client-key-..."\n></script>`
    console.warn(message)
    return
  }
  if (!node.dataset.key) {
    const message = `Authpack script tag missing "data-key" attribute i.e.:\n\n<script\n\tsrc="${filename}"\n\tdata-key="wga-client-key-..."\n></script>`
    console.warn(message)
    return
  }
  const config = { ...node.dataset } as { key: string; [key: string]: string }
  return new Authpack(config)
}
/**
 * Redirect unauthenticated users from protected pages.
 */
const guard = (authpack: Authpack) => {
  const node: HTMLElement = document.querySelector(`[data-authpack="guard"]`)
  if (!node) {
    return
  }
  if (!node.dataset.redirect) {
    const message = `Authpack guard tag missing "data-redirect" attribute i.e.:\n\n<div\n\tdata-authpack="guard"\n\tdata-redirect="/home"\n></div>`
    console.warn(message)
    return
  }
  authpack.plugin.listen(state => {
    if (state.ready && !state.user) {
      window.location.assign(node.dataset.redirect)
    }
  })
}
/**
 * Open the gadgets when item is clicked.
 */
const open = (authpack: Authpack) => {
  const node: HTMLElement = document.querySelector(`[data-authpack="show"]`)
  if (!node) {
    return
  }
  node.addEventListener('click', event => {
    event.preventDefault()
    authpack.plugin.show()
  })
}
/**
 * Replace attributes with currect state.
 */
const replace = (authpack: Authpack) => {
  const data = document.querySelectorAll(`[data-authpack="replace"]`)
  const nodes = [...data] as HTMLElement[]
  if (!nodes.length) {
    return
  }
  authpack.plugin.listen(state => {
    if (state.ready && state.user) {
      nodes.forEach(node => {
        if (!node.dataset.value) {
          const message = `Authpack replace tag missing "data-value" attribute i.e.:\n\n<div\n\tdata-authpack="replace"\n\tdata-value="user.name"\n></div>`
          console.warn(message)
          return
        }
        const steps = node.dataset.value.split('.').map(i => i.trim())
        const value = steps.reduce((accum, next) => accum[next], state)
        node.textContent = value
      })
    }
  })
}
