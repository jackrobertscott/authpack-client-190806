import { Radio } from 'iframe-radio'
import { settings, ISettings } from './utils/settings'
import { halter } from './utils/throttle'

export class Gadgets {
  public update: () => void
  private iframeId: string
  private iframe?: HTMLIFrameElement
  private radio?: Radio<{ name: string; payload?: any }>
  private unlistener?: () => any
  private ready: boolean
  private queue: Array<() => void>
  constructor({ suffix, domain }: { suffix?: string; domain: string }) {
    this.update = halter(300, () => this.send('wga:gadgets:update'))
    this.iframeId = `wga-plugin${suffix ? `-${suffix}` : ''}`
    this.render()
    this.ready = false
    this.queue = []
    this.send('wga:gadgets:domain', domain)
  }
  /**
   * Get the current state of the gadgets.
   */
  public get state() {
    return settings.state.session
  }
  /**
   * Listen to changes to the internal state.
   */
  public listen(callback: (current: ISettings['session']) => void) {
    return settings.listen(({ open = false, session }) => {
      callback(session)
      if (this.iframe) {
        this.iframe.style.pointerEvents = open ? 'all' : 'none'
      }
    })
  }
  /**
   * Open the gadgets.
   */
  public open() {
    this.send('wga:gadgets:open')
  }
  /**
   * Open the gadgets.
   */
  private send(name: string, payload?: any) {
    const message = () =>
      this.radio &&
      this.radio.message({
        name,
        payload,
      })
    if (this.ready) message()
    else this.queue.push(message)
  }
  /**
   * Create an iframe with gadgets.
   */
  private render() {
    this.iframe = document.createElement('iframe')
    this.iframe.src = document.location.hostname.includes('localhost')
      ? 'http://localhost:3100/'
      : 'https://plugin.wga.windowgadgets.io/'
    this.iframe.id = this.iframeId
    this.iframe.width = '100%'
    this.iframe.height = '100%'
    this.iframe.style.border = 'none'
    this.iframe.style.boxShadow = 'none'
    this.iframe.style.position = 'fixed'
    this.iframe.style.top = '0'
    this.iframe.style.bottom = '0'
    this.iframe.style.right = '0'
    this.iframe.style.left = '0'
    this.iframe.style.zIndex = '1000'
    this.iframe.style.transition = '200ms'
    this.iframe.style.pointerEvents = 'none'
    document.body.appendChild(this.iframe)
    if (this.radio) this.radio.destroy()
    this.radio = new Radio({
      id: 'wga',
      node: this.iframe.contentWindow,
    })
    if (this.unlistener) this.unlistener()
    this.unlistener =
      this.radio &&
      this.radio.listen(({ name, payload }) => {
        console.log(`Plugin received: ${name} - ${Date.now() % 86400000}`)
        switch (name) {
          case 'wga:plugin:set':
            settings.change(payload)
            break
          case 'wga:plugin:ready':
            this.ready = true
            this.queue.forEach(cb => cb())
            break
          default:
            console.warn(`Handler not found for ${name}`)
        }
      })
  }
}
