import { useState, useEffect, useMemo } from 'react'

export const usePagination = ({
  count,
}: {
  count?: number
}): {
  total: number
  limit: number
  page: number
  skip: number
  hasNext: () => boolean
  hasPrevious: () => boolean
  next: () => void
  previous: () => void
} => {
  const [pagination, changePagination] = useState({
    total: 0,
    limit: 50,
    page: 0,
    skip: 0,
  })
  useEffect(() => {
    changePagination(state => ({
      ...state,
      total: count || 0,
    }))
  }, [count])
  const hasNext = () => {
    const value =
      pagination.total &&
      pagination.total > (pagination.page + 1) * pagination.limit
    return Boolean(value)
  }
  const hasPrevious = () => Boolean(pagination.page > 0)
  const next = () => {
    if (hasNext())
      changePagination({
        total: pagination.total,
        limit: pagination.limit,
        page: pagination.page + 1,
        skip: pagination.limit * (pagination.page + 1),
      })
  }
  const previous = () => {
    if (hasPrevious())
      changePagination({
        total: pagination.total,
        limit: pagination.limit,
        page: pagination.page - 1,
        skip: pagination.limit * (pagination.page - 1),
      })
  }
  return useMemo(
    () => ({
      ...pagination,
      hasNext,
      hasPrevious,
      next,
      previous,
    }),
    // eslint-disable-next-line
    [pagination]
  )
}
