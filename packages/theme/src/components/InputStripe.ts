import { createElement as element, FC, useRef, useEffect } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { InputContainer } from './Input'

export const InputStripe: FC<{
  change?: (cardStripe: any) => void
  stripe?: any
  error?: (error: Error) => void
}> = ({ change, stripe, error }) => {
  const theme = useTheme()
  const input = useRef()
  useEffect(() => {
    if (stripe) {
      const cssSrc =
        'https://fonts.googleapis.com/css?family=Rubik:500&display=swap'
      const elements = stripe.elements({ fonts: [{ cssSrc }] })
      const cardStripe = elements.element('card', {
        hidePostalCode: true,
        style: {
          base: {
            fontFamily: 'Rubik',
            fontWeight: 500,
            color: theme.input.payment,
            iconColor: theme.input.payment,
          },
        },
      })
      cardStripe.mount(input.current)
      if (change) setTimeout(() => change(cardStripe))
      const handleError = (event: any = {}) => error && error(event.error)
      cardStripe.addEventListener('change', handleError)
      return () => cardStripe.removeEventListener('change', handleError)
    }
  }, [stripe])
  return element(InputContainer, {
    children: element('div', {
      ref: input,
      className: css({
        all: 'unset',
        display: 'flex',
        cursor: 'pointer',
        flexGrow: 1,
        padding: 15,
        '& > div': {
          width: '100%',
        },
      }),
    }),
  })
}
