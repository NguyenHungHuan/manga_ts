import { comics, data, dataRecommend } from '@/types/data'
import axiosClients from './axiosClients'

type paramOption = {
  page: number
  status: 'all' | 'completed' | 'ongoing'
}
export type pathNameTop = '/daily' | '/weekly' | '/monthly' | '/chapter' | '/follow' | '/comment'

const comicApis = {
  getRecentUpdate(params?: { page: number }) {
    const url = '/recent-update-comics'
    return axiosClients.get<data<comics[]>>(url, { params })
  },
  getRecommend() {
    const url = '/recommend-comics'
    return axiosClients.get<dataRecommend[]>(url)
  },
  getTrending(params?: { page: number }) {
    const url = '/trending-comics'
    return axiosClients.get<data<comics[]>>(url, { params })
  },
  getCompleted(params?: { page: number }) {
    const url = '/completed-comics'
    return axiosClients.get<data<comics[]>>(url, { params })
  },
  getBoy(params?: { page: number }) {
    const url = '/boy-comics'
    return axiosClients.get<data<comics[]>>(url, { params })
  },
  getGirl(params?: { page: number }) {
    const url = '/girl-comics'
    return axiosClients.get<data<comics[]>>(url, { params })
  },
  getTop(path?: pathNameTop, params?: paramOption) {
    const url = `/top${path}`
    return axiosClients.get<data<comics[]>>(url, { params })
  }
}
export default comicApis
