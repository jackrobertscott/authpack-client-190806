import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, FC, useEffect } from 'react'
import { css } from 'emotion'
import { RouterCentral } from './routers/RouterCentral'
import { useGadgets } from './hooks/useGadgets'

export const App: FC<{}> = () => {
  const state = useGadgets()
  return create('div', {
    children: state && state.user && create(RouterCentral),
    className: css({
      // code...
    }),
  })
}
