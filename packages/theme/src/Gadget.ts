import {
  createElement as create,
  FC,
  useContext,
  ReactNode,
  useState,
} from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'
import { Iconbar } from './Iconbar'
import { Header } from './Header'

export interface IGadgetRouter {
  id?: string
  icon: string
  label: string
  children: ReactNode
}

export interface IGadget {
  Container: FC<{
    children: ReactNode
  }>
  Contents: FC<{
    children: ReactNode
  }>
  Spacer: FC<{
    children: ReactNode
  }>
  Router: FC<{
    brand: string
    screens: IGadgetRouter[]
  }>
}

export const Gadget: IGadget = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        width: '545px',
        height: '760px',
        display: 'flex',
        overflow: 'hidden',
        fontSize: theme.global.fonts,
        borderRadius: theme.global.radius,
        background: theme.gadgets.background,
        border: theme.gadgets.border,
      }),
    })
  },
  Contents: ({ children }) => {
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexGrow: 1,
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
  Router: ({ screens, brand }) => {
    const options = screens.map((screen, i) => ({ ...screen, id: String(i) }))
    const [active, changeActive] = useState<IGadgetRouter & { id: string }>(
      options[0]
    )
    return create(Gadget.Container, {
      children: [
        create(Iconbar.Container, {
          children: options.map(screen =>
            create(Iconbar.Pointer, {
              key: screen.id,
              label: screen.label,
              children: create(Iconbar.Icon, {
                name: screen.icon,
                click: () => changeActive(screen),
              }),
            })
          ),
        }),
        create(Gadget.Contents, {
          children: [
            create(Header.Container, {
              children: [
                create(Header.Label, {
                  children: active.label,
                }),
                create(Header.Brand, {
                  children: brand,
                }),
              ],
            }),
            active && active.children,
          ],
        }),
      ],
    })
  },
}
