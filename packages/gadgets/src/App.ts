import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { RouterModalUnauthed } from './routers/RouterModalUnauthed'

export const App: FC<{}> = () => {
  return create('div', {
    children: create(RouterModalUnauthed),
    className: css({
      // code...
    }),
  })
}
