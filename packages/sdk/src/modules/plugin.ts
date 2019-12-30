import { createIFrame } from '../utils/iframe'
import { Radio, KeyStore } from 'events-and-things'

export class Plugin {
  private options: IPluginOptions
  private store: KeyStore<IPlugin>
  private iframe: HTMLIFrameElement
  private queue: Array<{ name: string; payload?: any }>
  private radio: Radio<{ name: string; payload?: any }>
  private loaded: boolean
  private id: string
  private key: string
  private url: string
  private debug: boolean
  constructor({ key, id, url, debug, options = {} }: IPluginConstructor) {
    if (!key || !key.includes('wga-client-key')) {
      const message = 'Please provide your client key i.e. "wga-client-key-..."'
      throw new Error(message)
    }
    this.key = key
    this.queue = []
    this.loaded = false
    this.options = options
    this.id = typeof id === 'string' ? id : 'authpack'
    this.url = typeof url === 'string' ? url : 'https://gadgets.v1.authpack.io'
    this.debug = typeof debug === 'boolean' ? debug : false
    this.store = this.createStore()
    this.iframe = this.createIFrame()
    this.radio = this.createRadio(this.iframe)
  }
  /**
   * Public...
   */
  public current() {
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
  public listen(callback: (current: IPlugin) => void) {
    return this.store.listen(callback)
  }
  /**
   * Private...
   */
  private sendMessage(name: string, payload?: any, before?: boolean) {
    const message = { name, payload }
    if (!this.radio)
      throw new Error('Failed to send message as radio does not exist')
    this.queue = before ? [message, ...this.queue] : [...this.queue, message]
    if (this.loaded) {
      const stack = this.queue.slice()
      for (const next of stack) this.radio.message(next)
      this.queue = []
    }
  }
  private createStore() {
    const store = createStore()
    store.update({
      bearer: localStorage.getItem('authpack.bearer') || undefined,
      client: this.key,
      domain: window.location.origin,
      options: {
        ...store.current.options,
        ...this.options,
      },
    })
    store.listen(data => {
      if (data.bearer) localStorage.setItem('authpack.bearer', data.bearer)
      else localStorage.removeItem('authpack.bearer')
      if (this.iframe)
        this.iframe.style.pointerEvents = data.open ? 'all' : 'none'
    })
    return store
  }
  private createIFrame() {
    const iframe = createIFrame(this.url)
    if (this.id) iframe.id = this.id
    document.body.appendChild(iframe)
    return iframe
  }
  private createRadio(iframe: HTMLIFrameElement) {
    const radio = new Radio<{
      name: string
      payload?: any
    }>(iframe.contentWindow, {
      key: 'authpack',
      origin: this.url,
    })
    radio.listen(({ name, payload = {} }) => {
      if (!name.startsWith('gadgets:')) return
      if (this.debug) console.log(`${name} @ ${Date.now() % 86400000}`)
      switch (name) {
        case 'gadgets:loaded':
          this.loaded = true
          this.sendMessage('plugin:current', this.store.current, true)
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
}

export interface IPluginConstructor {
  key: string
  id?: string
  url?: string
  debug?: boolean
  options?: IPluginOptions
}

export interface IPlugin {
  open: boolean
  ready: boolean
  client?: string
  bearer?: string
  domain?: string
  options: IPluginOptions
  cluster?: {
    id: string
    name: string
    theme_preference: string
    stripe_publishable_key: string
  }
  session?: {
    id: string
    token: string
  }
  user?: {
    id: string
    email: string
    verified: boolean
    subscribed: boolean
    username: string
    name?: string
    name_given?: string
    name_family?: string
  }
  plan?: {
    id: string
    name: string
    tag: string
    description?: string
    statement?: string
    amount: number
    currency: string
    interval: string
    interval_seperator: number
  }
  team?: {
    id: string
    name: string
    tag: string
    description?: string
  }
  membership?: {
    id: string
    admin: boolean
  }
}

export interface IPluginOptions {
  enable_teams?: boolean
  prompt_teams?: boolean
  theme_preset?: string
}

const createStore = (data: Partial<IPlugin> = {}) => {
  return new KeyStore<IPlugin>({
    open: false,
    ready: false,
    ...data,
    options: {
      enable_teams: false,
      prompt_teams: false,
      ...data.options,
    },
  })
}
