import axios from 'axios'
import config from 'config'
import stores from 'stores'

export default (options) => {

  let method = options.method || 'GET'
  const headers = {}

  if (options.data) {
    method = 'POST'
  }

  if (options.url.includes('pv')) {
    headers.Authorization = `Bearer ${stores.auth.token}`
  }

  return axios({
    method,
    headers,
    url: `${config.API_ROOT}${options.url}`,
    data: options.data || null,
  })

}
