import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { RouterCentral } from './routers/RouterCentral'

export const App: FC<{}> = () => {
  return create('div', {
    children: create(RouterCentral),
    className: css({
      // code...
    }),
  })
}
