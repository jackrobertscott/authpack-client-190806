import { createElement as create, FC, useState, useEffect } from 'react'
import { css } from 'emotion'
import { InputContainer, InputPopover, InputOption } from './Input'

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
  return create(InputContainer, {
    nofocus: true,
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
          create(InputPopover, {
            key: 'popover',
            close: () => openChange(false),
            children: [
              filter &&
                create(Search, {
                  key: 'search',
                  filter,
                  placeholder: 'Search...',
                }),
              value &&
                create(InputOption, {
                  key: 'clear',
                  icon: 'times',
                  label: 'Clear',
                  click: () => change && change(undefined),
                  reverse: true,
                }),
              options.map(option => {
                return create(InputOption, {
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

const Search: FC<{
  filter: (value: string) => void
  placeholder?: string
}> = ({ filter, placeholder }) => {
  const [phrase, phraseChange] = useState<string>('')
  useEffect(() => {
    filter(phrase)
  }, [phrase])
  return create('input', {
    value: phrase,
    placeholder,
    onChange: event => phraseChange(event.target.value),
    autoFocus: true,
    className: css({
      all: 'unset',
      display: 'flex',
      cursor: 'pointer',
      flexGrow: 1,
      padding: 15,
    }),
  })
}
