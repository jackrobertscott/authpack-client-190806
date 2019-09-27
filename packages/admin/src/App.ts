import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { PluginGadgets } from 'wga-plugin'
import { RouterCentral } from './routers/RouterCentral'

const gadgets = new PluginGadgets('123456789', '12345678')

gadgets.render()

export const App: FC<{}> = () => {
  // const [auth, changeAuth] = useState()
  // return create('div', {
  //   children: auth ? create(RouterCentral) : create(RouterModalUnauthed),
  //   className: css({
  //     // code...
  //   }),
  // })
  return create('div', {
    children: create(RouterCentral),
    className: css({
      // code...
    }),
  })
}
