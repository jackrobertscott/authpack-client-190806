import { Authpack, IPlugin } from '@authpack/sdk'

if (!window) {
  const message = `Please ensure Authpack scripts are used in a browser`
  throw new Error(message)
}
interface IContext {
  authpack: Authpack
  state: IPlugin
}
/**
 * Run initial events once the page has loaded.
 */
window.addEventListener('load', () => {
  const authpack = load()
  const dispatch = (context: IContext) =>
    [guard, plugin, replace, show, hide].map(dispatcher => {
      return dispatcher(context)
    })
  dispatch({ authpack, state: authpack.plugin.current() })
  authpack.plugin.listen(state => dispatch({ authpack, state }))
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
const guard = (context: IContext) => {
  const node: HTMLElement = document.querySelector(`[data-authpack="guard"]`)
  if (!node) {
    return
  }
  if (!node.dataset.redirect) {
    const message = `Authpack guard tag missing "data-redirect" attribute i.e.:\n\n<div\n\tdata-authpack="guard"\n\tdata-redirect="/home"\n></div>`
    console.warn(message)
    return
  }
  if (context.state.ready && !context.state.user) {
    window.location.assign(node.dataset.redirect)
  }
}
/**
 * Open the gadgets when item is clicked.
 */
const plugin = (context: IContext) => {
  const node: HTMLElement = document.querySelector(`[data-authpack="plugin"]`)
  if (!node) {
    return
  }
  if (node.dataset.listening !== 'true') {
    node.dataset.listening = 'true'
    node.addEventListener('click', event => {
      context.authpack.plugin.show()
      event.preventDefault()
    })
  }
}
/**
 * Replace attributes with currect state.
 */
const replace = (context: IContext) => {
  const data = document.querySelectorAll(`[data-authpack="replace"]`)
  const nodes = [...data] as HTMLElement[]
  if (!nodes.length) {
    return
  }
  if (context.state.ready && context.state.user) {
    nodes.forEach(node => {
      if (!node.dataset.value) {
        const message = `Authpack replace tag missing "data-value" attribute i.e.:\n\n<div\n\tdata-authpack="replace"\n\tdata-value="user.name"\n></div>`
        console.warn(message)
        return
      }
      const steps = node.dataset.value.split('.').map(i => i.trim())
      const value = steps.reduce((accum, next) => accum[next], context.state)
      node.textContent = value
    })
  }
}
/**
 * Show an element when it satisfies any of the conditions.
 */
const show = (context: IContext) => {
  const data = document.querySelectorAll(`[data-authpack="show"]`)
  const nodes = [...data] as HTMLElement[]
  if (!nodes.length) {
    return
  }
  if (context.state.ready && context.state.user) {
    nodes.forEach(node => {
      const assertions = [
        !node.dataset.plan ||
          node.dataset.plan
            .split(',')
            .map(plan => plan.trim())
            .includes(context.state.plan.tag),
        // todo: more conditions
      ]
      node.dataset.display = node.dataset.display || node.style.display
      node.style.display = assertions.includes(false)
        ? 'none'
        : node.dataset.display || node.style.display
    })
  }
}
/**
 * Hide an element when it satisfies any of the conditions.
 */
const hide = (context: IContext) => {
  const data = document.querySelectorAll(`[data-authpack="hide"]`)
  const nodes = [...data] as HTMLElement[]
  if (!nodes.length) {
    return
  }
  if (context.state.ready && context.state.user) {
    nodes.forEach(node => {
      const assertions = [
        !node.dataset.plan ||
          node.dataset.plan
            .split(',')
            .map(plan => plan.trim())
            .includes(context.state.plan.tag),
        // todo: more conditions
      ]
      node.dataset.display = node.dataset.display || node.style.display
      node.style.display = assertions.includes(true)
        ? 'none'
        : node.dataset.display || node.style.display
    })
  }
}
