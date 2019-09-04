import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { Button } from 'wga-theme'

export const App: FC<{}> = () => {
  return create('div', {
    children: create(Button.Container, {
      label: 'Submit',
      click: () => console.log(123),
    }),
    className: css({
      height: '100vh',
      padding: '50px',
      backgroundColor: 'green',
    }),
  })
}
