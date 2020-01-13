import Vue, { PluginFunction } from 'vue'
import { Authpack } from '@authpack/sdk'

export const Plugin: { install: PluginFunction<{ value: Authpack }> } = {
  install: (vue, options) => {
    if (!options) throw new Error('Please provide Authpack plugin options')
    if (!options.value)
      throw new Error('Please provide Authpack as the "value" option')
    vue.prototype.$authpack = createAuthpack(options.value)
  },
}

let instance: Vue
let unlisten: () => void
const createAuthpack = (authpack: Authpack) => {
  if (!instance)
    instance = new Vue({
      data() {
        return {
          current: authpack.current(),
        }
      },
      created() {
        if (unlisten) unlisten()
        unlisten = authpack.listen(current => {
          this.current = current
        })
      },
      destroyed() {
        if (unlisten) unlisten()
      },
    })
  return instance
}
