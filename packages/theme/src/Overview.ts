import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IOverview {
  Container: FC<{
    icon: string
    label: string
    value?: string
    click?: () => void
  }>
}

export const Overview: IOverview = {
  Container: ({ icon, label, value, click }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: create('div', {
        children: [
          create('div', {
            key: 'icon',
            className: `fas far fa-${icon} ${css({
              lineHeight: '1.5em',
              marginRight: '7.5px',
              color: theme.lists.label,
            })}`,
          }),
          create('div', {
            key: 'marker',
            children: [
              create('div', {
                key: 'label',
                children: label,
                className: css({
                  color: theme.lists.label,
                  marginBottom: '3.75px',
                }),
              }),
              create('div', {
                key: 'value',
                children: value || '...',
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
        }),
      }),
      onClick: click,
      className: css({
        all: 'unset',
        display: 'flex',
        padding: '15px',
        transition: '200ms',
        cursor: click && 'pointer',
        color: theme.lists.color,
        background: theme.lists.background,
        borderRadius: theme.global.radius,
        '&:hover:not(:active)': {
          background: click && theme.lists.backgroundHover,
        },
      }),
    })
  },
}
