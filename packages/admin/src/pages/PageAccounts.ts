import { createElement as create, FC } from 'react'
import { Inputs, Button, Page } from 'wga-theme'
import { css } from 'emotion'

export interface IPageAccounts {}

export const PageAccounts: FC<IPageAccounts> = () => {
  return create(Page.Container, {
    key: 'contents',
    title: 'Accounts',
    description: 'See all the users who have signed up to your app',
    children: create('div', {
      children: [
        create(Inputs.Control, {
          key: 'name',
          label: 'Name',
          description: 'Full name please',
          input: props =>
            create(Inputs.String, {
              ...props,
              placeholder: 'Fred Blogs',
            }),
        }),
        create(Button.Container, {
          key: 'submit',
          label: 'Submit',
          click: () => console.log(123),
        }),
      ],
      className: css({
        padding: '25px',
        '& > *, & > div': {
          marginBottom: '25px',
          '&:last-child': {
            marginBottom: 0,
          },
        },
      }),
    }),
  })
}
