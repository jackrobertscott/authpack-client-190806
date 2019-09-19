import { createElement as create, FC, useContext } from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IPoster {
  Container: FC<{
    icon: string
    label: string
    description: string
  }>
}

export const Poster: IPoster = {
  Container: ({ icon, label, description }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create('div', {
          key: 'icon',
          className: `fas far fa-${icon} ${css({
            fontSize: '25px',
            lineHeight: '1.5em',
            color: theme.posters.icon,
          })}`,
        }),
        create('div', {
          key: 'label',
          children: label,
          className: css({
            color: theme.posters.label,
          }),
        }),
        create('div', {
          key: 'description',
          children: description,
          className: css({
            color: theme.posters.description,
          }),
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '25px',
        borderRadius: theme.global.radius,
        background: theme.posters.background,
        '& > *, & > div': {
          marginBottom: '7.5px',
          '&:last-child': {
            marginBottom: 0,
          },
        },
      }),
    })
  },
}
