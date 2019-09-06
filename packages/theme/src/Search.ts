import {
  createElement as create,
  FC,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface ISearch {
  Container: FC<{
    children: ReactNode
  }>
  Input: FC<{
    icon: string
    value?: string
    change?: (value: string) => void
    placeholder?: string
  }>
  Group: FC<{
    icon: string
    label: string
    click?: () => void
  }>
}

export const Search: ISearch = {
  Container: ({ children }) => {
    const theme = useContext(Theme)
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        padding: '25px',
        background: theme.search.background,
        '& > *, & > div': {
          marginRight: '25px',
          '&:last-child': {
            marginRight: 0,
          },
        },
      }),
    })
  },
  Input: ({ icon, value = '', change = () => {}, placeholder }) => {
    const theme = useContext(Theme)
    const [state, changeState] = useState<string>(value)
    useEffect(() => changeState(value), [value])
    useEffect(() => change(state), [state])
    return create('div', {
      children: [
        create('div', {
          key: 'icon',
          className: `fas far fa-${icon} ${css({
            lineHeight: '1.2em',
            marginRight: '7.5px',
          })}`,
        }),
        create('input', {
          value: state,
          onChange: event =>
            state !== event.target.value && changeState(event.target.value),
          placeholder,
          className: css({
            all: 'unset',
            padding: '25px 0',
            margin: '-25px 0',
            display: 'flex',
            flexGrow: 1,
          }),
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        flexGrow: 1,
        transition: '200ms',
        cursor: 'pointer',
        color: theme.search.color,
        '&:hover, &:focus-within': {
          color: theme.search.colorHover,
        },
      }),
    })
  },
  Group: ({ icon, label, click }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: click,
      children: [
        create('div', {
          key: 'icon',
          className: `fas far fa-${icon} ${css({
            lineHeight: '1.2em',
            marginRight: '7.5px',
          })}`,
        }),
        create('div', {
          key: 'label',
          children: label,
          className: css({
            all: 'unset',
            display: 'flex',
          }),
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        transition: '200ms',
        cursor: 'pointer',
        color: theme.search.color,
        '&:hover': {
          color: click && theme.search.colorHover,
        },
      }),
    })
  },
}
