import faker from 'faker'
import {
  createElement as element,
  FC,
  useState,
  useEffect,
  useRef,
} from 'react'
import { Page, Table, Empty, Button, drip } from '@authpack/theme'
import { format } from 'date-fns'
import { RouterManagerCoupon } from './RouterManagerCoupon'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListCoupons: FC = () => {
  const gqlListCoupons = useListCoupons()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    options: { [key: string]: any }
    phrase?: string
  }>({
    options: { sort: 'created' },
  })
  const queryListCoupons = useRef(drip(1000, gqlListCoupons.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListCoupons.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const newCoupon = () => {
    buildChange(true)
    setTimeout(() => idcurrentChange(undefined), 200) // animation
  }
  const list =
    gqlListCoupons.data && gqlListCoupons.data.count
      ? gqlListCoupons.data.coupons
      : variables.phrase ||
        Boolean(gqlListCoupons.data && !gqlListCoupons.data.coupons)
      ? []
      : FakeCoupons
  return element(Page, {
    title: 'Coupons',
    subtitle: 'Payment discount codes',
    hidden: !gqlListCoupons.data || !gqlListCoupons.data.count,
    corner: {
      icon: 'plus',
      label: 'New Coupon',
      click: newCoupon,
    },
    noscroll: element(TemplateSearchBar, {
      count: gqlListCoupons.data && gqlListCoupons.data.count,
      current: gqlListCoupons.data && gqlListCoupons.data.coupons.length,
      change: (phrase, limit, skip) => {
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
          phrase,
        })
      },
    }),
    children: [
      element(RouterManagerCoupon, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListCoupons.current(variables)
          if (id) {
            idcurrentChange(id)
          } else {
            buildChange(false)
            setTimeout(() => idcurrentChange(undefined), 200) // animation
          }
        },
        close: () => {
          buildChange(false)
          setTimeout(() => idcurrentChange(undefined), 200) // animation
        },
      }),
      gqlListCoupons.data &&
        !gqlListCoupons.data.count &&
        element(Empty, {
          key: 'empty',
          icon: 'users',
          label: 'Coupons',
          helper: 'Would you like to create a coupon?',
          children: element(Button, {
            key: 'Regular',
            icon: 'plus',
            label: 'New Coupon',
            click: newCoupon,
          }),
        }),
      gqlListCoupons.data &&
        element(Table, {
          key: 'table',
          header: [
            { key: 'name', label: 'Name' },
            { key: 'tag', label: 'Tag' },
            { key: 'description', label: 'Description' },
            { key: 'updated', label: 'Updated' },
            { key: 'created', label: 'Created' },
          ].map(({ key, label }) => ({
            label,
            icon:
              variables.options && variables.options.sort === key
                ? variables.options.reverse
                  ? 'chevron-down'
                  : 'chevron-up'
                : 'equals',
            click: () =>
              variablesChange({
                ...variables,
                options: {
                  ...variables.options,
                  sort: key,
                  reverse: !variables.options.reverse,
                },
              }),
          })),
          rows: list.map(data => ({
            id: data.id,
            click: () => {
              idcurrentChange(data.id)
              buildChange(true)
            },
            cells: [
              { icon: 'users', value: data.name },
              { icon: 'fingerprint', value: data.tag || '...' },
              { icon: 'book', value: data.description || '...' },
              {
                icon: 'clock',
                value: format(new Date(data.updated), 'dd LLL h:mm a'),
              },
              {
                icon: 'clock',
                value: format(new Date(data.created), 'dd LLL h:mm a'),
              },
            ],
          })),
        }),
    ],
  })
}

const useListCoupons = createUseServer<{
  count: number
  coupons: Array<{
    id: string
    created: string
    updated: string
    name: string
    tag: string
    description?: string
  }>
}>({
  query: `
    query ListCoupons($phrase: String, $options: WhereOptions) {
      count: CountCoupons(phrase: $phrase)
      coupons: ListCoupons(phrase: $phrase, options: $options) {
        id
        created
        updated
        name
        tag
        description
      }
    }
  `,
})

const FakeCoupons: Array<{
  id: string
  created: string
  updated: string
  name: string
  tag: string
  description?: string
}> = Array.from(Array(8).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  updated: faker.date.recent(100).toDateString(),
  name: faker.random.words(2),
  tag: faker.internet.userName(),
  description: faker.random.words(5),
}))
