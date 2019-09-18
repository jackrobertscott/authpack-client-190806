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
    disable?: boolean
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
        padding: '0 25px',
        width: '100%',
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
            lineHeight: '1.5em',
          })}`,
        }),
        create('input', {
          key: 'input',
          value: state,
          onChange: event =>
            state !== event.target.value && changeState(event.target.value),
          placeholder,
          className: css({
            all: 'unset',
            padding: '25px 0',
            marginLeft: '7.5px',
            transition: '200ms',
            '&:focus': {
              padding: '15px 0',
              marginLeft: '15px',
              fontSize: 25,
            },
            flexGrow: 1,
          }),
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        alignItems: 'center',
        transition: '200ms',
        cursor: 'pointer',
        fontSize: 15,
        flexGrow: 1,
        color: theme.search.color,
        '&:hover, &:focus-within': {
          color: theme.search.colorHover,
        },
      }),
    })
  },
  Group: ({ icon, label, click, disable }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: () => !disable && click && click(),
      children: [
        create('div', {
          key: 'icon',
          className: `fas far fa-${icon} ${css({
            lineHeight: '1.5em',
            marginRight: '7.5px',
          })}`,
        }),
        create('div', {
          key: 'label',
          children: label,
          className: css({
            textDecoration: disable ? 'line-through' : 'none',
          }),
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        transition: '200ms',
        padding: '25px 0',
        cursor: click && !disable ? 'pointer' : 'default',
        color: theme.search.color,
        '&:hover': click &&
          !disable && {
            color: theme.search.colorHover,
          },
      }),
    })
  },
}
