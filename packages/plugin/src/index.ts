export class PluginGadgets {
  private key: string
  private iframeId: string
  constructor(domainKey: string, random: string) {
    this.key = domainKey
    this.iframeId = `wga-plugin${random ? `-${random}` : ''}`
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
  }
}
