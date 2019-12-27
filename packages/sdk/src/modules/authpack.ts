import { Plugin, IPluginConstructor, IPlugin } from './plugin'
import { API, IAPIConstructor } from './api'

export class Authpack {
  private internal: {
    api: API
    plugin: Plugin
    current: IPlugin
  }
  constructor(options: IAuthpackConstructor) {
    if (!options.key || !options.key.includes('wga-client-key')) {
      const message = 'Please provide your client key i.e. "wga-client-key-..."'
      throw new Error(message)
    }
    const api = new API(options)
    const plugin = new Plugin(options)
    this.internal = {
      api,
      plugin,
      current: plugin.current(),
    }
    this.internal.plugin.listen(data => {
      this.internal.current = data
    })
  }
  get plugin() {
    return this.internal.plugin
  }
  get api() {
    return this.internal.api
  }
  get current() {
    return this.internal.current
  }
}

export type IAuthpackConstructor = IPluginConstructor & IAPIConstructor & {}
