import { createElement as create, FC, ReactNode, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IPage {
  Container: FC<{
    title: string
    description: string
    children: ReactNode
    button?: {
      icon: string
      label: string
      click: () => void
    }
  }>
}

export const Page: IPage = {
  Container: ({ title, description, children, button }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create('div', {
          key: 'header',
          children: [
            create('div', {
              key: 'words',
              children: [
                create('div', {
                  key: 'title',
                  children: title,
                  className: css({
                    fontSize: '25px',
                    lineHeight: '1em',
                    color: theme.headers.color,
                  }),
                }),
                create('div', {
                  key: 'brand',
                  children: description,
                  className: css({
                    fontSize: '15px',
                    marginTop: '7.5px',
                    color: theme.headers.brand,
                  }),
                }),
              ],
              className: css({
                all: 'unset',
                display: 'flex',
                flexDirection: 'column',
                padding: '25px',
              }),
            }),
            button &&
              create('div', {
                key: 'button',
                onClick: button.click,
                children: [
                  create('div', {
                    key: 'icon',
                    className: `fas far fa-${button.icon} ${css({
                      fontSize: '25px',
                      textAlign: 'center',
                      lineHeight: '1em',
                    })}`,
                  }),
                  create('div', {
                    key: 'label',
                    children: button.label,
                    className: css({
                      fontSize: '15px',
                      marginTop: '7.5px',
                    }),
                  }),
                ],
                className: css({
                  all: 'unset',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  padding: '25px',
                  cursor: 'pointer',
                  transition: '200ms',
                  color: theme.headers.button,
                  '&:hover': {
                    color: theme.headers.buttonHover,
                    background: theme.headers.backgroundHover,
                  },
                }),
              }),
          ],
          className: css({
            all: 'unset',
            display: 'flex',
            justifyContent: 'space-between',
            background: theme.headers.background,
          }),
        }),
        create('div', {
          key: 'children',
          children,
          className: css({
            all: 'unset',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            flexGrow: 1,
            background: theme.gadgets.background,
            '&::-webkit-scrollbar': {
              width: '20px',
              display: 'initial',
              backgroundColor: 'hsla(0, 0, 0, 0)',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'hsla(0, 0, 0, 0)',
            },
            '&::-webkit-scrollbar-thumb': {
              cursor: 'pointer',
              transition: '200ms',
              borderRadius: '100px',
              boxShadow: `inset 0 0 0 5px ${theme.gadgets.background}`,
              background: theme.gadgets.scrollbar,
            },
          }),
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        flexGrow: 1,
      }),
    })
  },
}
