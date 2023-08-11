import axios from 'axios'

const axiosClients = axios.create({
  baseURL: 'https://comics-api.vercel.app',
  timeout: 10000000
})

axiosClients.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClients.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosClients
