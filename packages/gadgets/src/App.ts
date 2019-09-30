import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, FC, useEffect } from 'react'
import { css } from 'emotion'
import { RouterModalUnauthed } from './routers/RouterModalUnauthed'
import { internalStateConnect } from './utils/transfer'

export const App: FC<{}> = () => {
  useEffect(() => internalStateConnect(), [])
  return create('div', {
    children: create(RouterModalUnauthed),
    className: css({
      // code...
    }),
  })
}
