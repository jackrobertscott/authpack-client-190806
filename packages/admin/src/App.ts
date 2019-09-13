import { createElement as create, FC, useState } from 'react'
import { css } from 'emotion'
import { RouterCentral } from './routers/RouterCentral'
import { RouterModalUnauthed } from './routers/RouterModalUnauthed'

export const App: FC<{}> = () => {
  const [auth, changeAuth] = useState()
  return create('div', {
    children: auth ? create(RouterCentral) : create(RouterModalUnauthed),
    className: css({
      // code...
    }),
  })
  // return create('div', {
  //   children: create(RouterCentral),
  //   className: css({
  //     // code...
  //   }),
  // })
}
