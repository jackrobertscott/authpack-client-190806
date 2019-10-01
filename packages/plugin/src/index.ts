import { Radio } from 'iframe-radio'
import { settingsStore, ISettings } from './utils/settings'

export type IPluginGadgets = ISettings['current']

export class PluginGadgets {
  private key: string
  private iframeId: string
  private iframe?: HTMLIFrameElement
  private radio?: Radio<{ name: string; payload: any }>
  private unlistener?: () => any
  constructor(domainKey: string, random: string) {
    this.key = domainKey
    this.iframeId = `wga-plugin${random ? `-${random}` : ''}`
  }
  /**
   * Create an iframe with gadgets.
   */
  public render() {
    const iframe = document.createElement('iframe')
    iframe.src = document.location.hostname.includes('localhost')
      ? 'http://localhost:3100/'
      : 'https://plugin.wga.windowgadgets.io/'
    iframe.id = this.iframeId
    iframe.width = '100%'
    iframe.height = '100%'
    iframe.style.border = 'none'
    iframe.style.boxShadow = 'none'
    iframe.style.position = 'fixed'
    iframe.style.top = '0'
    iframe.style.bottom = '0'
    iframe.style.right = '0'
    iframe.style.left = '0'
    iframe.style.zIndex = '1000'
    iframe.style.opacity = '0'
    iframe.style.pointerEvents = 'none'
    this.iframe = iframe
    document.body.appendChild(iframe)
    if (this.radio) this.radio.destroy()
    this.radio = new Radio({
      id: 'wga',
      node: iframe.contentWindow,
    })
    if (this.unlistener) this.unlistener()
    this.unlistener =
      this.radio &&
      this.radio.listen(({ name, payload }) => {
        switch (name) {
          case 'wga:set':
            settingsStore.change(payload)
            break
          default:
            throw new Error(`Handler not found for ${name}`)
        }
      })
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
        if (open) {
          this.iframe.style.opacity = '1'
          this.iframe.style.pointerEvents = 'all'
        } else {
          this.iframe.style.opacity = '0'
          this.iframe.style.pointerEvents = 'none'
        }
      }
    })
  }
  /**
   * Open the gadgets.
   */
  public open() {
    if (this.radio)
      this.radio.message({
        name: 'wga:open',
        payload: undefined,
      })
  }
}
