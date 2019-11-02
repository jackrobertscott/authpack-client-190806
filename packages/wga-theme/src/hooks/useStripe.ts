import { useMemo } from 'react'

export const useStripe = ({ stripe }: { stripe: any }) => {
  const tokenize = (cardStripe: any, options: any = {}) => {
    return stripe
      .createToken(cardStripe, options)
      .then(({ error, token }: any = {}) => {
        if (error) throw error
        return token
      })
  }
  const factory = () => ({ tokenize })
  return useMemo(factory, [stripe])
}
