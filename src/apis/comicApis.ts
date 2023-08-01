import { data } from '@/types/data'
import axiosClients from './axiosClients'

type paramTop = {
  page: number
  status: 'all' | 'completed' | 'updating'
}

const comicApis = {
  getRecommend() {
    const url = '/recommend-comics'
    return axiosClients.get<data>(url)
  },
  getTrending(params?: { page: number }) {
    const url = '/trending-comics'
    return axiosClients.get<data>(url, { params })
  },
  getRecentUpdate(params?: { page: number }) {
    const url = '/recent-update-comics'
    return axiosClients.get<data>(url, { params })
  },
  getCompleted(params?: { page: number }) {
    const url = '/completed-comics'
    return axiosClients.get<data>(url, { params })
  },
  getTopAll(params?: paramTop) {
    const url = '/top'
    return axiosClients.get<data>(url, { params })
  },
  getTopDaily(params?: paramTop) {
    const url = '/top/daily'
    return axiosClients.get<data>(url, { params })
  },
  getTopWeekly(params?: paramTop) {
    const url = '/top/weekly'
    return axiosClients.get<data>(url, { params })
  },
  getTopMonthly(params?: paramTop) {
    const url = '/top/monthly'
    return axiosClients.get<data>(url, { params })
  },
  getTopChapter(params?: paramTop) {
    const url = '/top/chapter'
    return axiosClients.get<data>(url, { params })
  },
  getTopFollow(params?: paramTop) {
    const url = '/top/follow'
    return axiosClients.get<data>(url, { params })
  },
  getTopComment(params?: paramTop) {
    const url = '/top/comment'
    return axiosClients.get<data>(url, { params })
  },
}

export default comicApis


