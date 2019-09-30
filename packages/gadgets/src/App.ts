import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { RouterModalUnauthed } from './routers/RouterModalUnauthed'
import { useSettings } from './hooks/useSettings'

export const App: FC<{}> = () => {
  useSettings()
  return create('div', {
    children: create(RouterModalUnauthed),
    className: css({
      // code...
    }),
  })
}
