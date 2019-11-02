import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, FC, useEffect } from 'react'
import { css } from 'emotion'
import { RouterCentral } from './routers/RouterCentral'
import { useGadgetsState } from './hooks/useGadgets'
import { gadgets } from './utils/wga'

export const App: FC<{}> = () => {
  const { state, loading } = useGadgetsState()
  useEffect(() => {
    if (!loading && !state) {
      gadgets.open()
    }
  }, [state, loading])
  return create('div', {
    children:
      state && state.user && state.workspace ? create(RouterCentral) : null,
    className: css({
      // code...
    }),
  })
}
