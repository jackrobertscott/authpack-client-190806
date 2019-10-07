import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Inputs, Button, Gadgets, Poster } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'
import { useStore } from '../hooks/useStore'
import { stripe } from '../utils/stripe'

export type ICreateSubscription = {
  change?: () => void
}

export const CreateSubscription: FC<ICreateSubscription> = ({ change }) => {
  // initialize the provider form values and apply validators
  const [card, cardChange] = useState()
  const [issue, issueChange] = useState<Error>()
  const [value, valueStore] = useStore('CreateSubscription', {
    ...schemaCreateSubscription.default(),
  })
  const validateAndPatch = (path: string) => (data: any) => {
    const update = { ...value, [path]: data }
    valueStore.change(update)
    return schemaCreateSubscription.validateAt(path, update)
  }
  useEffect(() => {
    let mounted = true
    schemaCreateSubscription
      .validate(value)
      .then(() => mounted && issueChange(undefined))
      .catch(error => mounted && issueChange(error))
    return () => {
      mounted = false
    }
  }, [value])
  // create the provider when the form is submitted
  const createSubscription = useCreateSubscription()
  const submit = () => {
    schemaCreateSubscription
      .validate(value)
      .then(data => stripe.createToken(card, { name: data.name }))
      .then((data: { token: any; error?: Error }) => {
        if (data.error) throw data.error
        return data
      })
      .then(data => createSubscription.fetch({ options: data }))
      .then(() => {
        if (change) change()
        setTimeout(() =>
          valueStore.change({ ...schemaCreateSubscription.default() })
        )
      })
  }
  return create(Gadgets.Container, {
    label: 'Activate Gadgets',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Poster.Container, {
          key: 'poster',
          icon: 'bolt',
          label: 'Activate Gadgets',
          description: 'Remove gadget limits and login real users',
        }),
        create(Inputs.Control, {
          key: 'name',
          label: 'Card Name',
          description: 'Please provide the name on your card',
          change: validateAndPatch('name'),
          input: props =>
            create(Inputs.String, {
              ...props,
              value: value.name,
              placeholder: 'E.g. Fred Blogs',
            }),
        }),
        create(Inputs.Control, {
          key: 'card',
          label: 'Card Number',
          description: 'Please provide the name on your card',
          input: props =>
            create(Inputs.StripeCard, {
              ...props,
              stripe,
              change: data => cardChange(data),
            }),
        }),
        create(Button.Container, {
          key: 'submit',
          label: 'Create',
          click: submit,
          disable: !!issue,
        }),
      ],
    }),
  })
}

const useCreateSubscription = createUseGraph<{
  workspace: {
    id: string
  }
}>({
  query: `
    mutation CreateSubscription($options: CreateSubscriptionOptions!) {
      workspace: CreateSubscription(options: $options) {
        id
      }
    }
  `,
})

const schemaCreateSubscription = validator.object().shape({
  name: validator.string().required('Please provide the name on your card'),
})
