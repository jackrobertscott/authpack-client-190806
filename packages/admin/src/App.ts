import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { RouterCentral } from './routers/RouterCentral'

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
