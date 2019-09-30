import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, FC, useEffect } from 'react'
import { css } from 'emotion'
import { RouterCentral } from './routers/RouterCentral'
import { gadgets } from './utils/wga'

export const App: FC<{}> = () => {
  useEffect(() => {
    gadgets.render()
    return gadgets.listen(data => console.log('admin', data))
  }, [])
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
