import { createIFrame } from './utils/iframe'
import { Radio, KeyStore } from 'events-and-things'
import { config } from './config'
import { createGadgetsStore, IGadgets } from './store'

export interface IOptions {
  id?: string
  key: string
  enable_teams?: boolean
  prompt_teams?: boolean
}

export class Gadgets {
  private options: IOptions
  private iframe: HTMLIFrameElement
  private queue: Array<{ name: string; payload?: any }>
  private radio: Radio<{ name: string; payload?: any }>
  private store: KeyStore<IGadgets>
  private loaded: boolean
  constructor(options: {
    id?: string
    key: string
    enable_teams?: boolean
    prompt_teams?: boolean
  }) {
    if (!options.key || !options.key.includes('wga-client-key')) {
      const message = 'Please provide your client key i.e. "wga-client-key-..."'
      throw new Error(message)
    }
    this.queue = []
    this.loaded = false
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
      bearer: localStorage.getItem('wga.bearer') || undefined,
      client: options.key,
      enable_teams: options.enable_teams,
      prompt_teams: options.prompt_teams,
    })
    store.listen(data => {
      if (data.bearer) localStorage.setItem('wga.bearer', data.bearer)
      else localStorage.removeItem('wga.bearer')
      if (this.iframe)
        this.iframe.style.pointerEvents = data.open ? 'all' : 'none'
    })
    return store
  }
  private createIFrame(options: IOptions) {
    const iframe = createIFrame()
    if (options.id) iframe.id = options.id
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
        case 'gadgets:loaded':
          this.sendMessage('plugin:current', this.store.current)
          this.loaded = true
          const stack = [...this.queue]
          for (const message of stack) {
            if (message) this.sendMessage(message.name, message.payload)
          }
          this.queue = []
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
    if (!this.loaded) this.queue = [...this.queue, message]
    else this.radio.message(message)
  }
}
