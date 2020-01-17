import axios from 'axios'

export const graphql = async <T>({
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
  variables?: { [key: string]: any }
}): Promise<T> => {
  try {
    const done = await axios({
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization || '',
      },
      data: {
        query,
        variables,
        operationName,
      },
    })
    if (done.data.errors && done.data.errors.length) {
      throw done.data.errors[0]
    }
    return done.data && done.data.data
  } catch (error) {
    if (error.code && error.message) {
      return Promise.reject(error)
    }
    if (error.response) {
      return Promise.reject(error.response.data)
    }
    if (error.request) {
      return Promise.reject({
        code: 503,
        status: 'Service Unavailable',
        message: 'Could not connect to server',
        icon: 'wifi',
      })
    }
    return Promise.reject({
      code: 500,
      status: 'Error',
      message: 'We were unable to process the request',
      icon: 'bug',
      error,
    })
  }
}
