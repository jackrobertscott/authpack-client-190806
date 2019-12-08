import Vue, { PluginFunction } from 'vue'
import { Gadgets, IConstructor } from '@authpack/sdk'

export const Plugin: { install: PluginFunction<IConstructor> } = {
  install: (vue, options) => {
    if (!options) throw new Error('Please provide Authpack plugin options')
    const gadgets = new Gadgets(options)
    vue.prototype.$authpack = createAuthpack(gadgets)
  },
}

let instance: Vue
let unlisten: () => void
const createAuthpack = (gadgets: Gadgets) => {
  if (!instance)
    instance = new Vue({
      data() {
        return {
          gadgets,
          current: gadgets.current(),
        }
      },
      created() {
        if (unlisten) unlisten()
        unlisten = this.gadgets.listen(current => {
          this.current = current
        })
      },
      destroyed() {
        if (unlisten) unlisten()
      },
    })
  return instance
}
