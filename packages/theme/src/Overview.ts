import { createElement as create, FC, useContext, ReactNode } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IOverviewOption {
  icon: string
  label: string
  description: string
  click: () => void
}

export interface IOverview {
  Spacer: FC<{
    children: ReactNode
  }>
  Container: FC<{
    icon: string
    label: string
    value?: string
    click?: () => void
    options?: IOverviewOption[]
  }>
  Dropdown: FC<{
    options: IOverviewOption[]
    children: ReactNode
  }>
}

export const Overview: IOverview = {
  Spacer: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexGrow: 1,
        margin: '25px',
        '& > *, & > div': {
          borderBottom: theme.lists.border,
          '&:last-child': {
            borderBottom: 'none',
          },
        },
      }),
    })
  },
  Container: ({ icon, label, value, click, options }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: click,
      children: create('div', {
        children: [
          create('div', {
            key: 'label',
            children: [
              create('div', {
                key: 'icon',
                className: `fas far fa-${icon} ${css({
                  lineHeight: '1.5em',
                  marginRight: '7.5px',
                  width: '17.5px',
                  color: theme.lists.label,
                })}`,
              }),
              create('div', {
                key: 'label',
                children: label,
                className: css({
                  color: theme.lists.label,
                  marginBottom: '3.75px',
                  flexGrow: 1,
                }),
              }),
              options &&
                create(Overview.Dropdown, {
                  key: 'dropdown',
                  options,
                  children: create('div', {
                    className: `fas far fa-cog ${css({
                      lineHeight: '1.5em',
                      marginLeft: '7.5px',
                      width: '17.5px',
                      color: theme.lists.label,
                    })}`,
                  }),
                }),
            ],
            className: css({
              display: 'flex',
              flexGrow: 1,
            }),
          }),
          create('div', {
            key: 'value',
            children: value || '...',
            className: css({
              marginLeft: '25px',
            }),
          }),
        ],
        className: css({
          all: 'unset',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }),
      }),
      className: css({
        all: 'unset',
        display: 'flex',
        padding: '15px',
        transition: '200ms',
        cursor: click && 'pointer',
        color: theme.lists.color,
        background: theme.lists.background,
        '&:hover:not(:active)': {
          background: click && theme.lists.backgroundHover,
        },
        '&:first-child': {
          borderTopLeftRadius: theme.global.radius,
          borderTopRightRadius: theme.global.radius,
        },
        '&:last-child': {
          borderBottomLeftRadius: theme.global.radius,
          borderBottomRightRadius: theme.global.radius,
        },
      }),
    })
  },
  Dropdown: ({ options, children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create((() => children) as FC, {
          key: 'children',
        }),
        create('div', {
          key: 'options',
          children: options.map(option =>
            create('div', {
              key: option.label,
              onClick: option.click,
              children: [
                create('div', {
                  key: 'label',
                  children: [
                    create('div', {
                      key: 'icon',
                      className: `fas far fa-${option.icon} ${css({
                        lineHeight: '1.5em',
                        marginRight: '7.5px',
                        width: '17.5px',
                        color: theme.pointers.label,
                      })}`,
                    }),
                    create('div', {
                      key: 'label',
                      children: option.label,
                      className: css({
                        color: theme.pointers.label,
                        marginBottom: '3.75px',
                        flexGrow: 1,
                      }),
                    }),
                  ],
                  className: css({
                    display: 'flex',
                    flexGrow: 1,
                  }),
                }),
                create('div', {
                  key: 'value',
                  children: option.description,
                  className: css({
                    marginLeft: '25px',
                  }),
                }),
              ],
              className: css({
                all: 'unset',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                cursor: 'pointer',
                padding: '15px',
                borderBottom: theme.pointers.innerBorder,
                '&:last-child': {
                  borderBottom: 'none',
                },
                '&:hover': {
                  background: theme.pointers.innerBackground,
                },
              }),
            })
          ),
          className: `toggle-pointer ${css({
            all: 'unset',
            display: 'none',
            flexDirection: 'column',
            position: 'absolute',
            zIndex: 100,
            right: -5,
            top: -5,
            width: '240px',
            overflow: 'hidden',
            borderRadius: theme.global.radius,
            background: theme.pointers.background,
            border: theme.pointers.border,
            color: theme.pointers.color,
            boxShadow: '0 1px 25px -5px rgba(0, 0, 0, 0.35)',
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
}
