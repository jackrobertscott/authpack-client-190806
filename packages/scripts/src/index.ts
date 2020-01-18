import { Authpack, IPlugin } from '@authpack/sdk'
;(() => {
  if (!window) {
    const message = `Please ensure Authpack scripts are used in a browser`
    throw new Error(message)
  }
  interface IContext {
    authpack: Authpack
    state: IPlugin
  }
  /**
   * Create a cover for page.
   */
  let cover: HTMLDivElement
  const createCover = () => {
    cover = document.createElement('div')
    cover.style.background = '#fafafa'
    cover.style.position = 'fixed'
    cover.style.left = '0'
    cover.style.right = '0'
    cover.style.top = '0'
    cover.style.bottom = '0'
    cover.style.height = '100%'
    cover.style.width = '100%'
    cover.style.zIndex = '2147483647'
    document.body.appendChild(cover)
  }
  const destroyCover = () => {
    if (cover) {
      cover.remove()
      cover = undefined
    }
  }
  /**
   * Hide contents of page until ready.
   */
  const preready = () => {
    if (document.body.dataset.ready === 'true') return
    document.body.style.opacity = '0'
    createCover()
    setTimeout(() => {
      if (document.body.dataset.ready === 'true') return
      document.body.style.opacity = '0'
      setTimeout(() => {
        if (document.body.dataset.ready === 'true') return
        document.body.style.opacity = '0'
      })
    })
  }
  /**
   * Show contents of page once is ready.
   */
  const postready = (context: IContext) => {
    if (context.state.ready && document.body.dataset.ready !== 'true') {
      destroyCover()
      document.body.dataset.ready = 'true'
      document.body.style.opacity = ''
    }
  }
  /**
   * Run initial events once the page has loaded.
   */
  setTimeout(() => preready())
  window.addEventListener('load', () => {
    const authpack = load()
    const dispatch = (context: IContext) =>
      [open, replace, show, hide, guard].map(dispatcher => {
        return dispatcher(context)
      })
    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        let shouldUpdate = false
        if (mutation.type === 'attributes') {
          const isAuthpack =
            mutation.target instanceof HTMLElement &&
            !!mutation.target.dataset.authpack
          if (isAuthpack) shouldUpdate = true
        }
        if (mutation.type === 'childList') {
          const all = [...mutation.addedNodes.values()].filter(node => {
            if (node instanceof HTMLElement) return !!node.dataset.authpack
          })
          if (all.length) shouldUpdate = true
        }
        if (shouldUpdate) {
          dispatch({
            authpack,
            state: authpack.current(),
          })
        }
      }
    })
    observer.observe(document, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [
        'data-authpack',
        'data-redirect',
        'data-value',
        'data-trigger',
      ],
    })
    dispatch({
      authpack,
      state: authpack.current(),
    })
    authpack.listen(state => {
      dispatch({ authpack, state })
    })
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
  const open = (context: IContext) => {
    if (!context.state.ready) {
      return
    }
    const data = document.querySelectorAll(`[data-authpack="open"]`)
    const nodes = [...data] as HTMLElement[]
    if (!nodes.length) {
      return
    }
    nodes.forEach(node => {
      if (node.dataset.listening !== 'true') {
        node.dataset.listening = 'true'
        node.addEventListener('click', event => {
          context.authpack.open()
          const prompt =
            event.target instanceof HTMLElement
              ? event.target.dataset.prompt
              : undefined
          if (prompt) {
            context.authpack.update({
              prompt_plan: prompt,
            })
          }
          event.preventDefault()
        })
      }
    })
  }
  /**
   * Replace attributes with currect state.
   */
  const replace = (context: IContext) => {
    if (!context.state.ready) {
      return
    }
    const data = document.querySelectorAll(`[data-authpack="replace"]`)
    const nodes = [...data] as HTMLElement[]
    if (!nodes.length) {
      return
    }
    nodes.forEach(node => {
      if (!node.dataset.value) {
        const message = `Authpack replace tag missing "data-value" attribute i.e.:\n\n<div\n\tdata-authpack="replace"\n\tdata-value="user.name"\n></div>`
        console.warn(message)
        return
      }
      const steps = node.dataset.value.split('.').map(i => i.trim())
      const value = steps.reduce(
        (accum, next) => accum && accum[next],
        context.state
      )
      node.textContent =
        typeof value === 'object' ? JSON.stringify(value, null, 2) : value
    })
  }
  /**
   * Redirect unauthenticated users from protected pages.
   */
  const guard = (context: IContext) => {
    if (!context.state.ready) {
      return
    }
    const data = document.querySelectorAll(`[data-authpack="guard"]`)
    const nodes = [...data] as HTMLElement[]
    if (!nodes.length) {
      setTimeout(() => postready(context))
      return
    }
    const assertions = nodes.map(node => {
      if (!node.dataset.redirect) {
        const message = `Authpack guard tag missing "data-redirect" attribute i.e.:\n\n<div\n\tdata-authpack="guard"\n\tdata-redirect="/home"\n></div>`
        console.warn(message)
        return
      }
      if (node.dataset.value) {
        const steps = node.dataset.value.split('.').map(i => i.trim())
        const value = steps.reduce(
          (accum, next) => accum && accum[next],
          context.state
        )
        switch (node.dataset.trigger || 'present') {
          case 'present':
            if (!value) return
            break
          case 'missing':
            if (!!value) return
            break
          default:
            const message = `Authpack "data-trigger" attribute is incorrect: ${node.dataset.trigger}`
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
  /**
   * Helper method for show and hide nodes.
   */
  const conditional = (name: string, condition: boolean) => (
    context: IContext
  ) => {
    if (!context.state.ready) {
      return
    }
    const data = document.querySelectorAll(`[data-authpack="${name}"]`)
    const nodes = [...data] as HTMLElement[]
    if (!nodes.length) {
      return
    }
    nodes.forEach(node => {
      if (!node.dataset.value) {
        const message = `Authpack ${name} tag missing "data-value" attribute i.e.:\n\n<div\n\tdata-authpack="${name}"\n\tdata-value="user"\n\tdata-trigger="present"\n></div>`
        console.warn(message)
        return
      }
      let valid = false
      node.dataset.display =
        node.dataset.display || node.style.display || 'initial'
      const steps = node.dataset.value.split('.').map(i => i.trim())
      const value = steps.reduce(
        (accum, next) => accum && accum[next],
        context.state
      )
      switch (node.dataset.trigger || 'present') {
        case 'present':
          if (!!value) valid = true
          break
        case 'missing':
          if (!value) valid = true
          break
        default:
          const message = `Authpack "data-trigger" attribute is incorrect: ${node.dataset.trigger}`
          console.warn(message)
          return
      }
      node.style.display =
        valid === condition
          ? node.dataset.display || node.style.display
          : 'none'
    })
  }
  /**
   * Show an element when it satisfies any of the conditions.
   */
  const show = conditional('show', true)
  /**
   * Hide an element when it satisfies any of the conditions.
   */
  const hide = conditional('hide', false)
})()
