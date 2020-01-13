import { Plugin, IPluginConstructor, IPlugin, IPluginOptions } from './plugin'
import { API, IAPIConstructor, IAPIGraphql } from './api'

export class Authpack {
  private api?: API
  private plugin?: Plugin
  private initial: IAuthpackConstructor
  constructor(options: IAuthpackConstructor) {
    if (!options.key || !options.key.includes('wga-client-key')) {
      const message = 'Please provide your client key i.e. "wga-client-key-..."'
      throw new Error(message)
    }
    this.initial = options
  }
  public current(): IAuthpackCurrent {
    return this.internals.plugin.current()
  }
  public open(): void {
    return this.internals.plugin.show()
  }
  public exit(): void {
    return this.internals.plugin.exit()
  }
  public update(options: Partial<IAuthpackOptions>): void {
    return this.internals.plugin.update(options)
  }
  public listen(callback: (current: IAuthpackCurrent) => void): () => void {
    return this.internals.plugin.listen(callback)
  }
  public graphql<T>(options: IAuthpackGraphql): Promise<T> {
    return this.internals.api.graphql<T>(options)
  }
  /**
   * SSR will error attempting to use local storage
   * in the constructor method as the window object
   * does not exist on the server.
   */
  private get internals() {
    if (!this.api) this.api = new API(this.initial)
    if (!this.plugin) this.plugin = new Plugin(this.initial)
    return {
      api: this.api,
      plugin: this.plugin,
    }
  }
}

export type IAuthpackConstructor = IPluginConstructor & IAPIConstructor & {}

export type IAuthpackOptions = IPluginOptions

export type IAuthpackCurrent = IPlugin

export type IAuthpackGraphql = IAPIGraphql
