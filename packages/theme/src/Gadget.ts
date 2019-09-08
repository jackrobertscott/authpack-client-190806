import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IGadget {
  Container: FC<{
    children: ReactNode
    label: string
    brand: string
  }>
  Spacer: FC<{
    children: ReactNode
  }>
  Header: FC<{
    label: string
    brand: string
  }>
}

export const Gadget: IGadget = {
  Container: ({ children, label, brand }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: create('div', {
        children: [
          create(Gadget.Header, {
            key: 'header',
            label,
            brand,
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
          create('a', {
            key: 'brand',
            href: 'https://windowgadgets.io',
            target: '_blank',
            children: `Authenticator\nWindow Gadgets`,
            className: css({
              all: 'unset',
              padding: '25px',
              textAlign: 'right',
              whiteSpace: 'pre',
              cursor: 'pointer',
              transition: '200ms',
              filter: 'contrast(70%)',
              marginLeft: 'auto',
              color: theme.gadgets.background,
              '&:hover': {
                filter: 'contrast(30%)',
              },
            }),
          }),
        ],
        className: css({
          all: 'unset',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          flexGrow: 1,
        }),
      }),
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexGrow: 1,
        background: theme.gadgets.background,
      }),
    })
  },
  Spacer: ({ children }) => {
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexGrow: 1,
        padding: '25px',
        '& > *, & > div': {
          marginBottom: '25px',
          '&:last-child': {
            marginBottom: 0,
          },
        },
      }),
    })
  },
  Header: ({ label, brand }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create('div', {
          key: 'label',
          children: label,
          className: css({
            all: 'unset',
            color: theme.headers.color,
          }),
        }),
        create('div', {
          key: 'brand',
          children: brand,
          className: css({
            all: 'unset',
            color: theme.headers.brand,
          }),
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        padding: '25px',
        justifyContent: 'space-between',
        background: theme.headers.background,
        color: theme.headers.color,
      }),
    })
  },
}
