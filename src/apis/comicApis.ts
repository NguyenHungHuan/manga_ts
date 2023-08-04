import { comics, data } from '@/types/data'
import axiosClients from './axiosClients'

type paramTop = {
  page: number
  status: 'all' | 'completed' | 'updating'
}

export type pathName = 'daily' | 'weekly' | 'monthly' | 'chapter' | 'follow' | 'comment'


const comicApis = {
  getRecommend() {
    const url = '/recommend-comics'
    return axiosClients.get<comics[]>(url)
  },
  getTrending(params?: { page: number }) {
    const url = '/trending-comics'
    return axiosClients.get<data<comics[]>>(url, { params })
  },
  getRecentUpdate(params?: { page: number }) {
    const url = '/recent-update-comics'
    return axiosClients.get<data<comics[]>>(url, { params })
  },
  getCompleted(params?: { page: number }) {
    const url = '/completed-comics'
    return axiosClients.get<data<comics[]>>(url, { params })
  },
  getTopAll(params?: paramTop) {
    const url = '/top'
    return axiosClients.get<data<comics[]>>(url, { params })
  },
  getTop(path: pathName) {
    const url = `/top/${path}`
    return axiosClients.get<data<comics[]>>(url)
  }
}

export default comicApis


// recommend 1
// treding 2
// recent update 3
// top month day week month left
// completed 4
// boy page
// girl page

