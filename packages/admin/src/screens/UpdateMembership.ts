import * as validator from 'yup'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Button, Gadgets } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IUpdateMembership = {
  id: string
}

export const UpdateMembership: FC<IUpdateMembership> = ({ id }) => {
  // initialize the membership form values and apply validators
  const [issue, issueChange] = useState<Error>()
  const [value, valueChange] = useState({ ...schemaUpdateMembership.default() })
  // const validateAndPatch = (path: string) => (data: any) => {
  //   const update = { ...value, [path]: data }
  //   valueChange(update)
  //   return schemaUpdateMembership.validateAt(path, update)
  // }
  useEffect(() => {
    schemaUpdateMembership
      .validate(value)
      .then(() => issueChange(undefined))
      .catch(issueChange)
  }, [value])
  // load the membership and set as default form values
  const retrieveMembership = useRetrieveMembership({
    options: { id },
  })
  useEffect(() => {
    if (retrieveMembership.data)
      valueChange({
        // todo...
      })
  }, [retrieveMembership.data])
  // update the membership when the form is submitted
  const updateMembership = useUpdateMembership()
  const submit = () => {
    schemaUpdateMembership.validate(value).then(data => {
      const options = { ...data, id }
      updateMembership.fetch({ options }, 'UpdateMembership')
    })
  }
  return create(Gadgets.Container, {
    label: 'Update Membership',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: [
        create(Button.Container, {
          key: 'submit',
          label: 'Update',
          click: submit,
          disable: !!issue,
        }),
      ],
    }),
  })
}

const useRetrieveMembership = createUseGraph<{
  membership: {
    id: string
    name: string
    tag: string
    description: string
  }
}>({
  query: `
    query RetrieveMembership($options: RetrieveMembershipOptions!) {
      membership: RetrieveMembership(options: $options) {
        id
      }
    }
  `,
})

const useUpdateMembership = createUseGraph<{
  membership: {
    id: string
  }
}>({
  query: `
    mutation UpdateMembership($options: UpdateMembershipOptions!) {
      membership: UpdateMembership(options: $options) {
        id
      }
    }
  `,
})

const schemaUpdateMembership = validator.object().shape({
  // todo...
})
