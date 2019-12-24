import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
  Page,
  Button,
  useToaster,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdatePlan: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlGetPlan = useGetPlan()
  const gqlUpdatePlan = useUpdatePlan()
  const schema = useSchema({
    schema: SchemaUpdatePlan,
    submit: value => {
      gqlUpdatePlan.fetch({ id, value }).then(({ plan }) => {
        if (change) change(plan.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlGetPlan.fetch({ id }).then(({ plan }) => schema.set(plan))
    // eslint-disable-next-line
  }, [id])
  return element(Page, {
    title: 'Update',
    subtitle: 'Plan',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetPlan.data
        ? null
        : [
            element(Layout, {
              key: 'name',
              divide: true,
              media: true,
              children: [
                element(Control, {
                  key: 'name',
                  label: 'Name',
                  helper: 'Human friendly name',
                  error: schema.error('name'),
                  children: element(InputString, {
                    value: schema.value('name'),
                    change: schema.change('name'),
                    placeholder: 'Premium',
                  }),
                }),
                element(Control, {
                  key: 'tag',
                  label: 'Tag',
                  helper: 'Unique identifier',
                  error: schema.error('tag'),
                  children: element(InputString, {
                    value: schema.value('tag'),
                    change: schema.change('tag'),
                    placeholder: 'premium',
                  }),
                }),
              ],
            }),
            element(Control, {
              key: 'description',
              label: 'Description',
              error: schema.error('description'),
              children: element(InputString, {
                value: schema.value('description'),
                change: schema.change('description'),
                placeholder: 'Users gains access to...',
              }),
            }),
            element(Button, {
              key: 'submit',
              label: 'Save',
              loading: gqlGetPlan.loading || gqlUpdatePlan.loading,
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
    }),
  })
}

const SchemaUpdatePlan = yup.object().shape({
  name: yup.string().required('Please provide the plan name'),
  tag: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    )
    .required('Please provide the plan tag'),
  description: yup.string(),
})

const useGetPlan = createUseServer<{
  plan: {
    name: string
    tag: string
    description?: string
  }
}>({
  query: `
    query GetPlan($id: String!) {
      plan: GetPlan(id: $id) {
        name
        tag
        description
      }
    }
  `,
})

const useUpdatePlan = createUseServer<{
  plan: {
    id: string
  }
}>({
  query: `
    mutation UpdatePlan($id: String!, $value: UpdatePlanValue!) {
      plan: UpdatePlan(id: $id, value: $value) {
        id
      }
    }
  `,
})
