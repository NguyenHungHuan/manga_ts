import { comics, data, dataRecommend } from '@/types/data'
import axiosClients from './axiosClients'
import PATH from '@/utils/path'

type paramOption = {
  page: string
  status: 'all' | 'completed' | 'ongoing'
}
export type pathNameTop = '/daily' | '/weekly' | '/monthly' | '/chapter' | '/follow' | '/comment'
export type typeUrlComics = typeof PATH.recent | typeof PATH.popular | typeof PATH.boy| typeof PATH.girl | typeof PATH.completed

const comicApis = {
  getComicsByUrl( url: typeUrlComics, params?: { page: string }) {
    return axiosClients.get<data<comics[]>>(url, { params })
  },
  getRecommend() {
    const url = PATH.recommend
    return axiosClients.get<dataRecommend[]>(url)
  },
  getTop(path?: pathNameTop, params?: paramOption) {
    const url = `/top${path}`
    return axiosClients.get<data<comics[]>>(url, { params })
  }
}
export default comicApis
