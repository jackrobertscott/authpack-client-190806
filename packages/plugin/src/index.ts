import { Radio } from 'iframe-radio'
import { settingsStore, ISettings } from './utils/settings'

export type IPluginGadgets = ISettings['current']

export class PluginGadgets {
  private key: string
  private iframeId: string
  private iframe?: HTMLIFrameElement
  private radio?: Radio<{ name: string; payload?: any }>
  private unlistener?: () => any
  private ready: boolean
  private queue: Array<() => void>
  constructor(domainKey: string, random: string) {
    this.key = domainKey
    this.iframeId = `wga-plugin${random ? `-${random}` : ''}`
    this.render()
    this.ready = false
    this.queue = []
  }
  /**
   * Get the current state of the gadgets.
   */
  public get state(): IPluginGadgets {
    return settingsStore.state.current
  }
  /**
   * Listen to changes to the internal state.
   */
  public listen(callback: (current: ISettings['current']) => void) {
    return settingsStore.listen(({ open = false, current }) => {
      callback(current)
      if (this.iframe) {
        this.iframe.style.pointerEvents = open ? 'all' : 'none'
      }
    })
  }
  /**
   * Open the gadgets.
   */
  public open() {
    const sendMessage = () =>
      this.radio &&
      this.radio.message({
        name: 'wga:open',
      })
    if (this.ready) sendMessage()
    else this.queue.push(sendMessage)
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
        switch (name) {
          case 'wga:set':
            settingsStore.change(payload)
            break
          case 'wga:ready':
            this.ready = true
            this.queue.forEach(cb => cb())
            break
          default:
            console.warn(`Handler not found for ${name}`)
        }
      })
  }
}
