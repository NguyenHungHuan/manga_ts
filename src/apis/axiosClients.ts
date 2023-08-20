import axios from 'axios'

export const axiosClients = axios.create({
  baseURL: 'https://comics-api.vercel.app',
  timeout: 10000000
})

export const axiosClients2 = axios.create({
  baseURL: 'http://localhost:8080',
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
