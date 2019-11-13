import { createElement as create, FC, useRef, ReactNode, Fragment } from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'
import { Pointer } from './Pointer'

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
    pointer?: {
      label: string
      helper: string
    }
  }>
}> = ({ value, change, placeholder, options = [] }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      position: 'relative',
      background: theme.searchBar.background,
      borderTop: theme.searchBar.border,
    }),
    children: [
      change &&
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
  const element = useRef()
  return create('div', {
    ref: element,
    onClick: () => {
      const input: any =
        element.current && (element.current as any).querySelector('input')
      if (input) input.focus()
    },
    className: css({
      all: 'unset',
      display: 'flex',
      alignItems: 'center',
      transition: '200ms',
      cursor: 'pointer',
      padding: 25,
      flexGrow: 1,
      color: theme.searchBar.label,
      background: theme.searchBar.background,
      '&:hover, &:focus-within': {
        color: theme.searchBar.labelHover,
        background: theme.searchBar.backgroundHover,
      },
      'input::placeholder': {
        color: theme.searchBar.placeholder,
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
  pointer?: {
    label: string
    helper: string
  }
}> = ({ icon, solid, label, click, disabled, pointer }) => {
  const theme = useTheme()
  const children = create('div', {
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
          whiteSpace: 'nowrap',
        }),
      }),
    ],
  })
  return !pointer
    ? children
    : create(OptionPointer, {
        icon,
        children,
        ...pointer,
      })
}

const OptionPointer: FC<{
  icon: string
  solid?: boolean
  label: string
  helper: string
  children: ReactNode
}> = ({ icon, solid, label, helper, children }) => {
  return create('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      position: 'relative',
      cursor: 'pointer',
      '&:hover > .pointer': {
        pointerEvents: 'all',
        opacity: 1,
      },
    }),
    children: [
      create(Fragment, {
        key: 'children',
        children,
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
          right: 10,
          top: 10,
          zIndex: 200,
          transform: 'translateY(-100%)',
        }).concat(' pointer'),
        children: create(Pointer, {
          icon,
          solid,
          label,
          helper,
        }),
      }),
    ],
  })
}
