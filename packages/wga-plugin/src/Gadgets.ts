import { createIFrame } from './utils/iframe'
import { Radio, KeyStore } from 'events-and-things'
import { config } from './config'
import { createGadgetsStore, IGadgets } from './utils/state'

export interface IOptions {
  domain_key: string
  iframe_id?: string
  team_required?: boolean
}

export class Gadgets {
  private options: IOptions
  private iframe: HTMLIFrameElement
  private queue: Array<{ name: string; payload?: any }>
  private radio: Radio<{ name: string; payload?: any }>
  private store: KeyStore<IGadgets>
  constructor(options: IOptions) {
    this.queue = []
    this.options = options
    this.store = this.createStore(this.options)
    this.iframe = this.createIFrame(this.options)
    this.radio = this.createRadio(this.iframe)
  }
  /**
   * Public...
   */
  public get current() {
    return this.store.current
  }
  public show() {
    this.sendMessage('plugin:show')
  }
  public hide() {
    this.sendMessage('plugin:hide')
  }
  public exit() {
    this.sendMessage('plugin:exit')
  }
  public listen(callback: (current: IGadgets) => void) {
    return this.store.listen(callback)
  }
  public assert(current: IGadgets, tags: string[]) {
    const state = Array.isArray(current.permissions)
      ? current.permissions.filter(({ tag }) => tags.includes(tag))
      : []
    return state.length >= tags.length
  }
  /**
   * Private...
   */
  private createStore(options: IOptions) {
    const store = createGadgetsStore()
    store.update({
      ready: false,
      domain: options.domain_key,
      team_required: options.team_required,
    })
    store.listen(data => {
      if (this.iframe)
        this.iframe.style.pointerEvents = data.open ? 'all' : 'none'
    })
    return store
  }
  private createIFrame(options: IOptions) {
    const iframe = createIFrame()
    if (options.iframe_id) iframe.id = options.iframe_id
    document.body.appendChild(iframe)
    return iframe
  }
  private createRadio(iframe: HTMLIFrameElement) {
    const radio = new Radio<{
      name: string
      payload?: any
    }>(iframe.contentWindow, {
      key: 'wga',
      origin: config.urls.plugin,
    })
    radio.listen(({ name, payload = {} }) => {
      if (!name.startsWith('gadgets:')) return
      if (config.debug)
        console.log(`Plugin received: ${name} @ ${Date.now() % 86400000}`)
      switch (name) {
        case 'gadgets:ready':
          this.store.update({
            ready: true,
          })
          this.sendMessage('plugin:current', this.store.current)
          while (this.queue.length) {
            const message = this.queue.shift()
            if (message) this.sendMessage(message.name, message.payload)
          }
          break
        case 'gadgets:update':
          this.store.update({ ...payload })
          break
        default:
          throw new Error(`Failed to process radio message: ${name}`)
      }
    })
    return radio
  }
  private sendMessage(name: string, payload?: any) {
    if (!this.radio)
      throw new Error('Failed to send message as radio does not exist')
    const message = { name, payload }
    if (!this.store.current.ready) this.queue = [...this.queue, message]
    else this.radio.message(message)
  }
}
