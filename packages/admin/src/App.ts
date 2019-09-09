import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { Button, Gadgets, Inputs } from 'wga-theme'

export const App: FC<{}> = () => {
  return create('div', {
    className: css({
      padding: 50,
    }),
    children: 'Hello, Jack!',
  })
}
