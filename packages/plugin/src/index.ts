import { Radio } from 'iframe-radio'
import { Store } from 'events-and-things'

export type IInternalState =
  | undefined
  | {
      user: {
        id: string
        email: string
        username?: string
        avatar?: string
        name?: string
      }
      session: {
        id: string
        token: string
      }
      group?: {
        id: string
        name: string
        tag: string
      }
      permissions?: Array<{
        id: string
        name: string
        tag: string
        description?: string
      }>
    }

export class PluginGadgets {
  private key: string
  private iframeId: string
  private radio?: Radio<{ name: string; payload: any }>
  private interalState: Store<IInternalState>
  constructor(domainKey: string, random: string) {
    this.key = domainKey
    this.iframeId = `wga-plugin${random ? `-${random}` : ''}`
    this.interalState = new Store(undefined)
  }
  /**
   * Create an iframe with gadgets.
   */
  public render() {
    const gadget = document.createElement('iframe')
    gadget.src = document.location.hostname.includes('localhost')
      ? 'http://localhost:3100/'
      : 'https://plugin.wga.windowgadgets.io/'
    gadget.id = this.iframeId
    gadget.width = '100%'
    gadget.height = '100%'
    gadget.style.border = 'none'
    gadget.style.boxShadow = 'none'
    gadget.style.position = 'fixed'
    gadget.style.top = '0'
    gadget.style.bottom = '0'
    gadget.style.right = '0'
    gadget.style.left = '0'
    document.body.appendChild(gadget)
    if (this.radio) this.radio.destroy()
    this.radio = new Radio({
      id: 'wga',
      node: gadget.contentWindow,
    })
    this.radio.listen(({ name, payload }) => {
      if (name === 'wga:state') this.interalState.change(payload)
    })
  }
  /**
   * Get the current state of the gadgets.
   */
  public get state() {
    return this.interalState.state
  }
  /**
   * Listen to changes to the internal state.
   */
  public listen(callback: (state: IInternalState) => void) {
    return this.interalState.listen(callback)
  }
}
