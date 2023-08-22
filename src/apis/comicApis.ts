import {
  comicSingleChapter,
  comicSuggestSearch,
  comicsComment,
  comicsDetail,
  dataComics,
  dataGenres,
  dataRecommend
} from '@/types/data'
import PATH from '@/utils/path'
import { axiosClients, axiosClients2 } from './axiosClients'

export type paramOption = {
  type?: string
  status?: 'all' | 'completed' | 'ongoing' | string
  page?: string
  q?: string
}
export type typeUrlComics =
  | typeof PATH.recent
  | typeof PATH.popular
  | typeof PATH.boy
  | typeof PATH.girl
  | typeof PATH.completed
  | typeof PATH.top
  | string

const comicApis = {
  getComicsByUrl(url: typeUrlComics, params?: paramOption) {
    return axiosClients.get<dataComics>(url, { params })
  },
  getRecommend() {
    const url = PATH.recommend
    return axiosClients.get<dataRecommend[]>(url)
  },
  getGenre() {
    const url = PATH.genres
    return axiosClients.get<dataGenres>(url)
  },
  getComicsByGenre(id: string, params?: { page?: string }) {
    const url = `${PATH.genres}/${id}`
    return axiosClients.get<dataComics>(url, { params })
  },
  getNew(params?: paramOption) {
    const url = PATH.new
    return axiosClients2.get<dataComics>(url, { params })
  },
  getComicDetail(id: string) {
    const url = `${PATH.comics}/${id}`
    return axiosClients.get<comicsDetail>(url)
  },
  getComicComments(id: string, params?: { page: number }) {
    const url = `${PATH.comics}/${id}${PATH.comment}`
    return axiosClients2.get<comicsComment>(url, { params })
  },
  getComicChapter(id: string, chapterId: string) {
    const url = `${PATH.comics}/${id}${PATH.chapters}/${chapterId}`
    return axiosClients.get<comicSingleChapter>(url)
  },
  getSearch(params?: paramOption) {
    const url = PATH.search
    return axiosClients.get<dataComics>(url, { params })
  },
  getSearchSuggest(params?: { q: string }) {
    const url = PATH.searchSuggest
    return axiosClients.get<comicSuggestSearch>(url, { params })
  }
}
export default comicApis
