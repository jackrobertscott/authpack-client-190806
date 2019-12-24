import { createElement as element, FC } from 'react'
import { useTheme } from '../hooks/useTheme'
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
  return element('table', {
    className: css({
      all: 'unset',
      display: 'table',
      width: '100%',
      whiteSpace: 'nowrap',
      flexGrow: 1,
    }),
    children: [
      element('thead', {
        key: 'header',
        className: css({
          all: 'unset',
          display: 'table-header-group',
        }),
        children: element(Header, {
          header,
        }),
      }),
      element('tbody', {
        key: 'body',
        className: css({
          all: 'unset',
          display: 'table-row-group',
        }),
        children: rows.map(({ id, click, cells }) => {
          return element(Row, {
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
  return element('tr', {
    className: css({
      all: 'unset',
      display: 'table-row',
      background: theme.table.header,
    }),
    children: header.map(({ label, icon, prefix, click }, index) => {
      return element('th', {
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
        children: element('div', {
          className: css({
            all: 'unset',
            display: 'flex',
            alignItems: 'center',
          }),
          children: [
            icon &&
              element('div', {
                key: 'icon',
                className: css({
                  marginTop: 1,
                  marginRight: 10,
                }),
                children: element(Icon, {
                  icon,
                  prefix,
                }),
              }),
            element('div', {
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
  return element('tr', {
    onClick: click,
    className: css({
      all: 'unset',
      display: 'table-row',
      color: theme.table.value,
      fontWeight: theme.global.thin,
      '& > td': {
        transition: '200ms',
        background: theme.table.background,
      },
      '&:hover > td': click && {
        cursor: 'pointer',
        color: theme.table.valueHover,
        background: theme.table.backgroundHover,
      },
    }),
    children: cells.map((cell, index) => {
      return element(Cell, {
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
  return element('td', {
    className: css({
      all: 'unset',
      display: 'table-cell',
      padding: '20px 25px',
      borderBottom: theme.table.border,
    }),
    children: element('div', {
      className: css({
        all: 'unset',
        display: 'flex',
        alignItems: 'flex-start',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 140,
      }),
      children: [
        icon &&
          element('div', {
            key: 'icon',
            className: css({
              marginTop: 1,
              marginRight: 10,
            }),
            children: element(Icon, {
              icon,
              prefix,
            }),
          }),
        element('div', {
          key: 'value',
          children: value,
        }),
      ],
    }),
  })
}
