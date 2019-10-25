import axios from 'axios'

export const sender = async <V>({
  url,
  query,
  operationName,
  authorization,
  variables,
}: {
  url: string
  query: string
  operationName?: string
  authorization?: string
  variables: V
}) => {
  const response = await axios({
    url,
    method: 'post',
    headers: {
      ['Content-Type']: 'application/json',
      ['Authorization']: authorization || '',
    },
    data: {
      query,
      operationName,
      variables,
    },
  })
  return response.data
}
