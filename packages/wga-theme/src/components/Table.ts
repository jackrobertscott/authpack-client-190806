import { createElement as create, FC } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'

export const Table: FC<{
  header: Array<{
    label: string
    icon?: string
    solid?: boolean
    click?: () => void
  }>
  rows: Array<{
    id: string
    click?: () => void
    cells: Array<{
      value: string | number
      icon?: string
      solid?: boolean
    }>
  }>
}> = ({ header, rows }) => {
  const theme = useTheme()
  return create('table', {
    className: css({
      all: 'unset',
      display: 'table',
    }),
    children: [
      create(Header, {
        key: 'header',
        header,
      }),
      rows.map(({ id, click, cells }) => {
        return create(Row, {
          key: id,
          click,
          cells,
        })
      }),
    ],
  })
}

const Header: FC<{
  header: Array<{
    label: string
    icon?: string
    solid?: boolean
    click?: () => void
  }>
}> = ({ header }) => {
  const theme = useTheme()
  return create('tr', {
    className: css({
      all: 'unset',
      display: 'table-row',
      background: theme.table.header,
    }),
    children: header.map(({ label, icon, solid, click }) => {
      return create('th', {
        onClick: click,
        className: css({
          all: 'unset',
          display: 'table-cell',
          padding: 25,
          color: theme.table.label,
          '&:hover': click && {
            cursor: 'pointer',
            background: theme.table.headerHover,
          },
          '&:not(:last-child)': {
            borderRight: theme.table.border,
          },
        }),
        children: create('div', {
          className: css({
            all: 'unset',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }),
          children: [
            create('div', {
              key: 'label',
              children: label,
            }),
            icon &&
              create('div', {
                key: 'icon',
                className: css({
                  marginTop: 1,
                  marginLeft: 15,
                }),
                children: create(Icon, {
                  icon,
                  solid,
                }),
              }),
          ],
        }),
      })
    }),
  })
}

const Row: FC<{
  click?: () => void
  cells: Array<{
    value: string | number
    icon?: string
    solid?: boolean
  }>
}> = ({ click, cells }) => {
  const theme = useTheme()
  return create('tr', {
    onClick: click,
    className: css({
      all: 'unset',
      display: 'table-row',
      background: theme.table.background,
      '&:hover': click && {
        cursor: 'pointer',
        background: theme.table.backgroundHover,
      },
    }),
    children: cells.map((cell, index) => {
      return create(Cell, {
        key: `cell-${index}`,
        ...cell,
      })
    }),
  })
}

const Cell: FC<{
  value: string | number
  icon?: string
  solid?: boolean
}> = ({ value, icon, solid }) => {
  const theme = useTheme()
  return create('td', {
    className: css({
      all: 'unset',
      display: 'table-cell',
      padding: 25,
      color: theme.table.value,
      borderRight: theme.table.border,
      borderTop: theme.table.border,
    }),
    children: create('div', {
      className: css({
        all: 'unset',
        display: 'flex',
        alignItems: 'flex-start',
      }),
      children: [
        icon &&
          create('div', {
            key: 'icon',
            className: css({
              marginTop: 1,
              marginRight: 15,
            }),
            children: create(Icon, {
              icon,
              solid,
            }),
          }),
        create('div', {
          key: 'value',
          children: value,
        }),
      ],
    }),
  })
}
