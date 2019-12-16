import { createElement as element, FC, useState } from 'react'
import { css } from 'emotion'
import { InputContainer, InputPopover, InputOption } from './Input'

export const InputStringArray: FC<{
  value?: string[]
  change?: (value: string[]) => void
  placeholder?: string
}> = ({ value = [], change, placeholder }) => {
  const [open, openChange] = useState<boolean>(false)
  const [current, currentChange] = useState<string>('')
  const add = () => {
    if (current.trim() && !value.includes(current) && change) {
      change([...value, current])
      currentChange('')
    }
  }
  const remove = (option: string) => {
    if (change) change(value.filter(i => i !== option))
  }
  return element(InputContainer, {
    nofocus: true,
    children: element('div', {
      onClick: () => openChange(true),
      className: css({
        all: 'unset',
        display: 'flex',
        cursor: 'pointer',
        flexGrow: 1,
        padding: 15,
      }),
      children: [
        element('div', {
          key: 'value',
          children:
            value
              .join(', ')
              .substr(0, 50)
              .concat(value.join(', ').length > 50 ? '...' : '') || placeholder,
          className: css({
            flexGrow: 1,
            height: 18,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }),
        }),
        open &&
          element(InputPopover, {
            key: 'popover',
            close: () => openChange(false),
            children: [
              element('input', {
                key: 'input',
                value: current,
                placeholder,
                autoFocus: true,
                onChange: event => currentChange(event.target.value),
                onKeyPress: event => event.key === 'Enter' && add(),
                className: css({
                  all: 'unset',
                  display: 'flex',
                  cursor: 'pointer',
                  flexGrow: 1,
                  padding: 15,
                }),
              }),
              element(InputOption, {
                key: 'add',
                icon: 'plus',
                label: 'Press enter to add',
                click: add,
                reverse: true,
              }),
              value.map(option => {
                return element(InputOption, {
                  key: option,
                  icon: 'times',
                  label: option,
                  click: () => remove(option),
                })
              }),
            ],
          }),
      ],
    }),
  })
}
