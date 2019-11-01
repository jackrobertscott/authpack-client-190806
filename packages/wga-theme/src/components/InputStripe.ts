import { createElement as create, FC, useRef, useEffect } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'
import { Input } from './Input'

export const InputStripe: FC<{
  change?: (cardStripe: any) => void
  stripe?: any
  error?: (error: Error) => void
}> = ({ change, stripe, error }) => {
  const theme = useTheme()
  const input = useRef()
  useEffect(() => {
    if (stripe) {
      const elements = stripe.elements({
        fonts: [{ cssSrc: 'https://use.typekit.net/xzq3xtm.css' }],
      })
      const cardStripe = elements.create('card', {
        hidePostalCode: true,
        style: {
          base: {
            fontFamily: 'futura-pt',
            fontWeight: 700,
            color: theme.input.valueHover,
          },
        },
      })
      cardStripe.mount(input.current)
      if (change) change(cardStripe)
      const handleError = (event: any = {}) => error && error(event.error)
      cardStripe.addEventListener('change', handleError)
      return () => cardStripe.removeEventListener('change', handleError)
    }
  }, [stripe])
  return create(Input, {
    children: create('div', {
      ref: input,
      className: css({
        all: 'unset',
        display: 'flex',
        cursor: 'pointer',
        flexGrow: 1,
        padding: 15,
      }),
    }),
  })
}
