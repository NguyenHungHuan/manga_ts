import axios from 'axios'

export const axiosClients = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

export const axiosClients2 = axios.create({
  baseURL: import.meta.env.VITE_API_URL_2,
  timeout: 10000
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
