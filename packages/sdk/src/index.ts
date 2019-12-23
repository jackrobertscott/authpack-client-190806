import { createIFrame } from './utils/iframe'
import { Radio, KeyStore } from 'events-and-things'

export class Gadgets {
  private options: IOptions
  private store: KeyStore<IGadgets>
  private iframe: HTMLIFrameElement
  private queue: Array<{ name: string; payload?: any }>
  private radio: Radio<{ name: string; payload?: any }>
  private loaded: boolean
  private id: string
  private key: string
  private url: string
  private debug: boolean
  constructor({ key, id, url, debug, options = {} }: IConstructor) {
    if (!key || !key.includes('wga-client-key')) {
      const message = 'Please provide your client key i.e. "wga-client-key-..."'
      throw new Error(message)
    }
    this.id = this.key = key
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
  public listen(callback: (current: IGadgets) => void) {
    return this.store.listen(callback)
  }
  /**
   * Private...
   */
  private sendMessage(name: string, payload?: any) {
    if (!this.radio)
      throw new Error('Failed to send message as radio does not exist')
    const message = { name, payload }
    if (!this.loaded) this.queue = [...this.queue, message]
    else this.radio.message(message)
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
}

export interface IConstructor {
  key: string
  id?: string
  url?: string
  debug?: boolean
  options?: IOptions
}

export interface IGadgets {
  open: boolean
  ready: boolean
  client?: string
  bearer?: string
  domain?: string
  options: IOptions
  cluster?: {
    id: string
    name: string
    theme_preference: string
    subscribed: boolean
  }
  user?: {
    id: string
    email: string
    verified: boolean
    username: string
    name?: string
    name_given?: string
    name_family?: string
  }
  team?: {
    id: string
    name: string
    tag: string
    description?: string
  }
  session?: {
    id: string
    token: string
  }
}

export interface IOptions {
  enable_teams?: boolean
  prompt_teams?: boolean
}

const createStore = (data: Partial<IGadgets> = {}) => {
  return new KeyStore<IGadgets>({
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
