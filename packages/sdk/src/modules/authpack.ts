import { Plugin, IPluginConstructor, IPlugin, IPluginOptions } from './plugin'
import { API, IAPIConstructor, IAPIGraphql } from './api'

export class Authpack {
  private api: API
  private plugin: Plugin
  constructor(options: IAuthpackConstructor) {
    if (!options.key || !options.key.includes('wga-client-key')) {
      const message = 'Please provide your client key i.e. "wga-client-key-..."'
      throw new Error(message)
    }
    this.api = new API(options)
    this.plugin = new Plugin(options)
  }
  public current() {
    return this.plugin.current()
  }
  public open() {
    return this.plugin.show()
  }
  public exit() {
    return this.plugin.exit()
  }
  public update(options: Partial<IPluginOptions>) {
    return this.plugin.update(options)
  }
  public listen(callback: (current: IPlugin) => void) {
    return this.plugin.listen(callback)
  }
  public graphql<T>(options: IAPIGraphql) {
    return this.api.graphql<T>(options)
  }
}

export type IAuthpackConstructor = IPluginConstructor & IAPIConstructor & {}
