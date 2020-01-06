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
 * Hide contents of page until ready.
 */
const preready = () => {
  if (document.body.dataset.ready !== 'true') {
    document.body.style.display = 'none'
  }
}
/**
 * Show contents of page once is ready.
 */
const postready = (context: IContext) => {
  if (context.state.ready && document.body.dataset.ready !== 'true') {
    document.body.dataset.ready = 'true'
    document.body.style.display = 'initial'
  }
}
/**
 * Run initial events once the page has loaded.
 */
setTimeout(() => preready())
window.addEventListener('load', () => {
  const authpack = load()
  const dispatch = (context: IContext) =>
    [guard, plugin, replace, show, hide].map(dispatcher => {
      return dispatcher(context)
    })
  dispatch({
    authpack,
    state: authpack.plugin.current(),
  })
  authpack.plugin.listen(state => dispatch({ authpack, state }))
})
/**
 * Locate the authpack script tag and initialise the authpack instance.
 */
const load = () => {
  const filename = 'https://scripts.v1.authpack.io/index.js'
  const node: HTMLScriptElement =
    document.querySelector(`script[src="${filename}"]`) ||
    document.querySelector('script[src="index.js"][data-key]')
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
 * Open the gadgets when item is clicked.
 */
const plugin = (context: IContext) => {
  const data = document.querySelectorAll(`[data-authpack="plugin"]`)
  const nodes = [...data] as HTMLElement[]
  if (!nodes.length) {
    return
  }
  if (context.state.ready) {
    nodes.forEach(node => {
      if (node.dataset.listening !== 'true') {
        node.dataset.listening = 'true'
        node.addEventListener('click', event => {
          context.authpack.plugin.show()
          event.preventDefault()
        })
      }
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
  if (context.state.ready) {
    nodes.forEach(node => {
      if (!node.dataset.property) {
        const message = `Authpack replace tag missing "data-property" attribute i.e.:\n\n<div\n\tdata-authpack="replace"\n\tdata-property="user.name"\n></div>`
        console.warn(message)
        return
      }
      const steps = node.dataset.property.split('.').map(i => i.trim())
      const value = steps.reduce(
        (accum, next) => accum && accum[next],
        context.state
      )
      node.textContent =
        typeof value === 'object' ? JSON.stringify(value, null, 2) : value
    })
  }
}
/**
 * Redirect unauthenticated users from protected pages.
 */
const guard = (context: IContext) => {
  const data = document.querySelectorAll(`[data-authpack="guard"]`)
  const nodes = [...data] as HTMLElement[]
  if (!nodes.length) {
    setTimeout(() => postready(context))
    return
  }
  if (context.state.ready) {
    const assertions = nodes.map(node => {
      if (!node.dataset.redirect) {
        const message = `Authpack guard tag missing "data-redirect" attribute i.e.:\n\n<div\n\tdata-authpack="guard"\n\tdata-redirect="/home"\n></div>`
        console.warn(message)
        return
      }
      if (node.dataset.property) {
        if (!node.dataset.validate) {
          const message = `Authpack guard tag missing "data-validate" attribute i.e.:\n\n<div\n\tdata-authpack="guard"\n\tdata-redirect="/home"\n\tdata-property="user"\n\tdata-validate="present"\n></div>`
          console.warn(message)
          return
        }
        const steps = node.dataset.property.split('.').map(i => i.trim())
        const value = steps.reduce(
          (accum, next) => accum && accum[next],
          context.state
        )
        switch (node.dataset.validate) {
          case 'present':
            if (!!value) return
            break
          case 'missing':
            if (!value) return
            break
          default:
            const message = `Authpack "data-validate" attribute is incorrect: ${node.dataset.validate}`
            console.warn(message)
            return
        }
      } else if (context.state.user) {
        return
      }
      window.location.assign(node.dataset.redirect)
      return true
    })
    if (!assertions.includes(true)) {
      setTimeout(() => postready(context))
    }
  }
}
/**
 * Helper method for show and hide nodes.
 */
const conditional = (name: string, condition: boolean) => (
  context: IContext
) => {
  const data = document.querySelectorAll(`[data-authpack="${name}"]`)
  const nodes = [...data] as HTMLElement[]
  if (!nodes.length) {
    return
  }
  if (context.state.ready) {
    nodes.forEach(node => {
      if (!node.dataset.property) {
        const message = `Authpack ${name} tag missing "data-property" attribute i.e.:\n\n<div\n\tdata-authpack="${name}"\n\tdata-property="user"\n\tdata-validate="present"\n></div>`
        console.warn(message)
        return
      }
      if (!node.dataset.validate) {
        const message = `Authpack ${name} tag missing "data-validate" attribute i.e.:\n\n<div\n\tdata-authpack="${name}"\n\tdata-property="user"\n\tdata-validate="present"\n></div>`
        console.warn(message)
        return
      }
      let valid = false
      node.dataset.display = node.dataset.display || node.style.display
      const steps = node.dataset.property.split('.').map(i => i.trim())
      const value = steps.reduce(
        (accum, next) => accum && accum[next],
        context.state
      )
      switch (node.dataset.validate) {
        case 'present':
          if (!!value) valid = true
          break
        case 'missing':
          if (!value) valid = true
          break
        default:
          const message = `Authpack "data-validate" attribute is incorrect: ${node.dataset.validate}`
          console.warn(message)
          return
      }
      node.style.display =
        valid === condition
          ? node.dataset.display || node.style.display
          : 'none'
    })
  }
}
/**
 * Show an element when it satisfies any of the conditions.
 */
const show = conditional('show', true)
/**
 * Hide an element when it satisfies any of the conditions.
 */
const hide = conditional('hide', false)
