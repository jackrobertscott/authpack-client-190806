import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  Page,
  Button,
  useToaster,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateStripePlan: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlGetPlan = useGetPlan()
  const gqlUpdatePlan = useUpdatePlan()
  const schema = useSchema({
    schema: SchemaUpdatePlan,
    submit: value => {
      gqlUpdatePlan.fetch({ id, input: value }).then(({ plan }) => {
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
              key: 'description',
              label: 'Description',
              error: schema.error('description'),
              children: element(InputString, {
                value: schema.value('description'),
                change: schema.change('description'),
                placeholder: 'Upgrade and get access to...',
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
  description: yup.string(),
})

const useGetPlan = createUseServer<{
  plan: {
    name?: string
    description?: string
  }
}>({
  query: `
    query GetStripePlanClient($id: String!) {
      plan: GetStripePlanClient(stripe_plan_id: $id) {
        name
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
    mutation UpdateClusterStripePlanClient($id: String!, $input: UpdateClusterStripePlanInput!) {
      plan: UpdateClusterStripePlanClient(id: $id, input: $input) {
        id
      }
    }
  `,
})
