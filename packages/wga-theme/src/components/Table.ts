import { createElement as create, FC } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'

export const Table: FC<{
  header: Array<{
    label: string
    icon?: string
    prefix?: string
    click?: () => void
  }>
  rows: Array<{
    id: string
    click?: () => void
    cells: Array<{
      value?: string | number
      icon?: string
      prefix?: string
    }>
  }>
}> = ({ header, rows }) => {
  return create('table', {
    className: css({
      all: 'unset',
      display: 'table',
      flexGrow: 1,
    }),
    children: [
      create('thead', {
        key: 'header',
        className: css({
          all: 'unset',
          display: 'table-header-group',
        }),
        children: create(Header, {
          header,
        }),
      }),
      create('tbody', {
        key: 'body',
        className: css({
          all: 'unset',
          display: 'table-row-group',
        }),
        children: rows.map(({ id, click, cells }) => {
          return create(Row, {
            key: id,
            click,
            cells,
          })
        }),
      }),
    ],
  })
}

const Header: FC<{
  header: Array<{
    label: string
    icon?: string
    prefix?: string
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
    children: header.map(({ label, icon, prefix, click }, index) => {
      return create('th', {
        key: `header-${index}`,
        onClick: click,
        className: css({
          all: 'unset',
          display: 'table-cell',
          padding: '20px 25px',
          color: theme.table.label,
          borderBottom: theme.table.border,
          transition: '200ms',
          '&:hover': click && {
            cursor: 'pointer',
            background: theme.table.headerHover,
          },
        }),
        children: create('div', {
          className: css({
            all: 'unset',
            display: 'flex',
            alignItems: 'center',
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
                  prefix,
                }),
              }),
            create('div', {
              key: 'label',
              children: label,
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
    value?: string | number
    icon?: string
    prefix?: string
  }>
}> = ({ click, cells }) => {
  const theme = useTheme()
  return create('tr', {
    onClick: click,
    className: css({
      all: 'unset',
      display: 'table-row',
      color: theme.table.value,
      background: theme.table.background,
      transition: '200ms',
      '&:hover': click && {
        cursor: 'pointer',
        color: theme.table.valueHover,
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
  value?: string | number
  icon?: string
  prefix?: string
}> = ({ value, icon, prefix }) => {
  const theme = useTheme()
  return create('td', {
    className: css({
      all: 'unset',
      display: 'table-cell',
      padding: '20px 25px',
      borderBottom: theme.table.border,
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
              prefix,
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
