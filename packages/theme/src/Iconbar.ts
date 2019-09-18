import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IIconbarSubmenu {
  icon: string
  label: string
  description: string
  click?: () => void
}

export interface IIconbar {
  Container: FC<{
    top: ReactNode
    bottom?: ReactNode
  }>
  Spacer: FC<{
    children: ReactNode
  }>
  Icon: FC<{
    name: string
    click?: () => void
    active?: boolean
  }>
  Pointer: FC<{
    icon?: string
    label: string
    submenu?: IIconbarSubmenu[]
    children: ReactNode
  }>
  Submenu: FC<IIconbarSubmenu>
}

export const Iconbar: IIconbar = {
  Container: ({ top, bottom }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create(Iconbar.Spacer, {
          key: 'top',
          children: top,
        }),
        bottom &&
          create(Iconbar.Spacer, {
            key: 'bottom',
            children: bottom,
          }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '25px 0',
        width: '75px',
        flexShrink: 0,
        background: theme.iconbar.background,
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
        alignItems: 'center',
        '& > *, & > div': {
          marginBottom: '25px',
          '&:last-child': {
            marginBottom: 0,
          },
        },
      }),
    })
  },
  Icon: ({ name, click, active }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: click,
      className: `fas far fa-${name} ${css({
        fontSize: '25px',
        transition: '200ms',
        textAlign: 'center',
        lineHeight: '1.5em',
        cursor: 'pointer',
        width: '100%',
        color: active ? theme.iconbar.colorActive : theme.iconbar.color,
        '&:hover': !active && {
          color: theme.iconbar.colorHover,
        },
      })}`,
    })
  },
  Pointer: ({ icon = 'check-circle', label, submenu, children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create((() => children) as FC, {
          key: 'children',
        }),
        create('div', {
          key: 'pointer',
          children: create('div', {
            children: [
              create('div', {
                key: 'title',
                children: [
                  create('div', {
                    key: 'label',
                    children: label,
                    className: css({
                      all: 'unset',
                      flexGrow: 1,
                    }),
                  }),
                  create('div', {
                    key: 'icon',
                    className: `fas far fa-${icon} ${css({
                      lineHeight: '1.5em',
                    })}`,
                  }),
                ],
                className: css({
                  all: 'unset',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                }),
              }),
              submenu &&
                create('div', {
                  key: 'submenu',
                  children: submenu.map(item => create(Iconbar.Submenu, item)),
                  className: css({
                    all: 'unset',
                    display: 'flex',
                    flexDirection: 'column',
                  }),
                }),
            ],
            className: css({
              all: 'unset',
              padding: '15px',
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              fontSize: theme.global.fonts,
              borderRadius: theme.global.radius,
              background: theme.pointers.background,
              border: theme.pointers.border,
              color: theme.pointers.color,
              boxShadow: '0 1px 25px -5px rgba(0, 0, 0, 0.55)',
            }),
          }),
          className: `toggle-pointer ${css({
            all: 'unset',
            minWidth: '340px',
            position: 'absolute',
            zIndex: 100,
            left: '100%',
            top: '-7.5px',
            paddingLeft: '7.5px',
            display: 'none',
            '&:hover': {
              display: 'flex',
            },
          })}`,
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        position: 'relative',
        '&:hover .toggle-pointer': {
          display: 'flex',
        },
      }),
    })
  },
  Submenu: ({ icon, label, description, click }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: click,
      children: [
        create('div', {
          key: 'icon',
          className: `fas far fa-${icon} ${css({
            lineHeight: '1.5em',
            marginRight: '7.5px',
          })}`,
        }),
        create('div', {
          key: 'marker',
          children: [
            create('div', {
              key: 'label',
              children: label,
              className: css({
                color: theme.pointers.label,
                marginBottom: '3.75px',
              }),
            }),
            create('div', {
              key: 'description',
              children: description || '...',
              className: css({
                color: theme.pointers.description,
              }),
            }),
          ],
          className: css({
            display: 'flex',
            flexDirection: 'column',
          }),
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        padding: '7.5px',
        margin: '-7.5px',
        marginTop: '25px',
        cursor: 'pointer',
        transition: '200ms',
        borderRadius: theme.global.radius,
        borderTop: theme.pointers.innerBorder,
        '&:hover': {
          background: theme.pointers.innerBackground,
        },
      }),
    })
  },
}
