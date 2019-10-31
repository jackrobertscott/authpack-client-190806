import { createElement as create, FC } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'
import { Pointer } from './Pointer'

export const SearchBar: FC<{
  value?: string
  change?: (value: string) => void
  placeholder?: string
  devmode?: boolean
  options?: Array<{
    icon: string
    solid?: boolean
    label: string
    click?: () => void
    disabled?: boolean
  }>
}> = ({ value, change, placeholder, devmode, options = [] }) => {
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
      devmode &&
        create(Devmode, {
          key: 'devmode',
        }),
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
      cursor: disabled || !click ? undefined : 'pointer',
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

const Devmode: FC = () => {
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      cursor: 'pointer',
      '&:hover > .devmode': {
        pointerEvents: 'all',
        opacity: 1,
      },
    }),
    children: [
      create(Option, {
        key: 'option',
        icon: 'bolt',
        label: 'Dev Mode',
        click: () => {},
      }),
      create('div', {
        key: 'pointer',
        className: css({
          all: 'unset',
          display: 'flex',
          position: 'absolute',
          transition: '200ms',
          cursor: 'default',
          pointerEvents: 'none',
          opacity: 0,
          left: 10,
          bottom: 10,
          transform: 'translateY(100%)',
        }).concat(' devmode'),
        children: create(Pointer, {
          icon: 'bolt',
          label: 'Enabled',
          helper:
            'You are currently viewing development data. Changes to this data will not effect your monthly pricing. This mode is allowed a maximum of 250 users.',
        }),
      }),
    ],
  })
}
