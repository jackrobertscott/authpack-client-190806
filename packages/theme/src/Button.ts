import {
  createElement as create,
  FC,
  useContext,
  ReactNode,
  useState,
} from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IButton {
  Container: FC<{
    icon?: string
    label: string
    click: () => void
    disable?: boolean
    confirm?: boolean
  }>
  Wrap: FC<{
    click: () => void
    children: ReactNode
    disable?: boolean
    cancel?: boolean
  }>
  Icon: FC<{
    name?: string
  }>
}

export const Button: IButton = {
  Container: ({ icon, label, click, disable, confirm }) => {
    const [stage, stageChange] = useState<boolean>(false)
    return create('div', {
      children: [
        create(Button.Wrap, {
          key: 'confirm',
          click: confirm ? (stage ? click : () => stageChange(true)) : click,
          disable,
          children: [
            create('div', {
              key: 'label',
              children: stage && confirm ? 'Continue' : label,
            }),
            create(Button.Icon, {
              key: 'icon',
              name: icon || disable ? 'times-circle' : 'check-circle',
            }),
          ],
        }),
        stage &&
          confirm &&
          create(Button.Wrap, {
            key: 'cancel',
            click: () => stageChange(false),
            disable,
            cancel: true,
            children: [
              create('div', {
                key: 'label',
                children: 'Cancel',
              }),
              create(Button.Icon, {
                key: 'icon',
                name: 'times-circle',
              }),
            ],
          }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        '& > *, & > div': {
          marginRight: '15px',
          '&:last-child': {
            marginRight: 0,
          },
        },
      }),
    })
  },
  Wrap: ({ click, children, disable, cancel }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: disable ? () => {} : click,
      children,
      className: `${disable ? 'disable' : ''} ${css({
        all: 'unset',
        display: 'flex',
        flexGrow: 1,
        cursor: disable ? 'default' : 'pointer',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        transition: '200ms',
        fontSize: theme.global.fonts,
        border: theme.buttons.border,
        borderRadius: theme.global.radius,
        background: disable
          ? theme.buttons.backgroundDisable
          : cancel
          ? theme.buttons.cancel
          : theme.buttons.background,
        color: disable ? theme.buttons.colorDisable : theme.buttons.color,
        '&:hover:not(.disable)': {
          background: theme.buttons.backgroundHover,
          boxShadow: '0 1px 7.5px rgba(0, 0, 0, 0.05)',
        },
        '&:active:not(.disable)': {
          background: theme.buttons.background,
          boxShadow: 'none',
        },
      })}`,
    })
  },
  Icon: ({ name }) => {
    return create('div', {
      className: `far fa-${name} ${css({
        textAlign: 'center',
        lineHeight: '1.5em',
      })}`,
    })
  },
}
