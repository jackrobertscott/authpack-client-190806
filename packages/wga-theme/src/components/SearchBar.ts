import { createElement as create, FC } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'

export const SearchBar: FC<{
  value?: string
  change?: (value: string) => void
  placeholder?: string
  options?: Array<{
    icon: string
    solid?: boolean
    label: string
    click?: () => void
    disabled?: boolean
  }>
}> = ({ value, change, placeholder, options = [] }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      width: '100%',
      background: theme.searchBar.background,
      borderBottom: theme.searchBar.border,
    }),
    children: [
      create(Searcher, {
        key: 'searcher',
        value,
        change,
        placeholder,
      }),
      !!options.length &&
        options.map((option, index) => {
          return create(Option, {
            key: `option-${index}`,
            ...option,
          })
        }),
    ],
  })
}

const Searcher: FC<{
  value?: string
  change?: (value: string) => void
  placeholder?: string
}> = ({ value = '', change, placeholder = 'Search...' }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      alignItems: 'center',
      transition: '200ms',
      cursor: 'pointer',
      padding: 25,
      fontSize: 15,
      flexGrow: 1,
      color: theme.searchBar.label,
      background: theme.searchBar.background,
      '&:hover, &:focus-within': {
        color: theme.searchBar.labelHover,
        background: theme.searchBar.backgroundHover,
      },
    }),
    children: [
      create(Icon, {
        key: 'icon',
        icon: 'search',
        solid: true,
      }),
      create('input', {
        key: 'input',
        value,
        onChange: event => change && change(event.target.value),
        placeholder,
        className: css({
          all: 'unset',
          marginLeft: 15,
          flexGrow: 1,
        }),
      }),
    ],
  })
}

const Option: FC<{
  icon: string
  solid?: boolean
  label: string
  click?: () => void
  disabled?: boolean
}> = ({ icon, solid, label, click, disabled }) => {
  const theme = useTheme()
  return create('div', {
    onClick: disabled ? undefined : click,
    className: css({
      all: 'unset',
      display: 'flex',
      alignItems: 'center',
      transition: '200ms',
      padding: 25,
      cursor: click && !disabled ? 'pointer' : 'default',
      color: disabled ? theme.searchBar.labelDisabled : theme.searchBar.label,
      background: disabled
        ? theme.searchBar.backgroundDisabled
        : theme.searchBar.background,
      '&:hover': click && {
        color: disabled
          ? theme.searchBar.labelDisabled
          : theme.searchBar.labelHover,
        background: disabled
          ? theme.searchBar.backgroundDisabled
          : theme.searchBar.backgroundHover,
      },
    }),
    children: [
      create(Icon, {
        key: 'icon',
        icon,
        solid,
      }),
      create('div', {
        key: 'label',
        children: label,
        className: css({
          marginLeft: 15,
        }),
      }),
    ],
  })
}
