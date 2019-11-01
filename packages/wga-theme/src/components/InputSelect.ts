import OutsideClickHandler from 'react-outside-click-handler'
import {
  createElement as create,
  FC,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'
import { Input } from './Input'
import { Icon } from './Icon'

export const InputSelect: FC<{
  value?: string
  change?: (value?: string) => void
  filter?: (value: string) => void
  placeholder?: string
  options?: Array<{
    value: string
    label: string
    helper?: string
  }>
}> = ({ value, change, filter, options = [], placeholder }) => {
  const [open, openChange] = useState<boolean>(false)
  const current = options.find(option => option.value === value)
  useEffect(() => {
    if (change && current && current.value !== value) change(current.value)
  }, [value])
  return create(Input, {
    children: create('div', {
      onClick: () => openChange(true),
      className: css({
        all: 'unset',
        display: 'flex',
        cursor: 'pointer',
        flexGrow: 1,
        padding: 15,
      }),
      children: [
        create('div', {
          key: 'value',
          children: current ? current.label : placeholder || 'Select...',
          className: css({
            flexGrow: 1,
          }),
        }),
        open &&
          create(Popover, {
            key: 'popover',
            close: () => openChange(false),
            children: [
              filter &&
                create(Search, {
                  filter,
                  placeholder: 'Search...',
                }),
              value &&
                create(Option, {
                  key: 'clear',
                  icon: 'times',
                  label: 'Clear...',
                  click: () => change && change(undefined),
                }),
              options.map(option => {
                return create(Option, {
                  key: option.value,
                  icon:
                    current && current.value === option.value
                      ? 'check'
                      : 'plus',
                  click: () => {
                    setTimeout(() => openChange(false))
                    setTimeout(() => change && change(option.value))
                  },
                  ...option,
                })
              }),
            ],
          }),
      ],
    }),
  })
}

const Popover: FC<{
  close: () => void
  children: ReactNode
}> = ({ close, children }) => {
  const theme = useTheme()
  return create(OutsideClickHandler, {
    onOutsideClick: close,
    children: create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        flexGrow: 1,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100,
        marginBottom: 25,
        overflow: 'hidden',
        borderRadius: theme.global.radius,
        background: theme.input.background,
        boxShadow: theme.input.shadow,
        border: theme.input.border,
      }),
    }),
  })
}

const Search: FC<{
  filter: (value: string) => void
  placeholder?: string
}> = ({ filter, placeholder = '...' }) => {
  const [phrase, phraseChange] = useState<string>('')
  useEffect(() => filter(phrase), [phrase])
  return create('input', {
    value: phrase,
    placeholder,
    onChange: event => phraseChange(event.target.value),
    className: css({
      all: 'unset',
      display: 'flex',
      cursor: 'pointer',
      flexGrow: 1,
      padding: 15,
    }),
  })
}

const Option: FC<{
  icon: string
  solid?: boolean
  label: string
  helper?: string
  click: (value: string) => void
}> = ({ icon, solid, label, helper, click }) => {
  const theme = useTheme()
  return create('div', {
    onClick: click,
    className: css({
      all: 'unset',
      display: 'flex',
      transition: '200ms',
      cursor: 'pointer',
      padding: 15,
      flexGrow: 1,
      color: theme.input.label,
      borderTop: theme.input.border,
      background: theme.input.background,
      '&:hover': {
        background: theme.input.backgroundHover,
      },
    }),
    children: [
      create('div', {
        key: 'text',
        className: css({
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginRight: 10,
        }),
        children: [
          create('div', {
            key: 'label',
            children: label,
          }),
          helper &&
            create('div', {
              key: 'helper',
              children: helper,
              className: css({
                marginTop: 5,
                color: theme.input.helper,
              }),
            }),
        ],
      }),
      create(Icon, {
        key: 'icon',
        icon,
        solid,
      }),
    ],
  })
}
