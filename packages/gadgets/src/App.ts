import { createElement as create, FC } from 'react'
import { css } from 'emotion'

export const App: FC<{}> = () => {
  return create('div', {
    children: 'Hello world!',
    className: css({
      // code...
    }),
  })
}
