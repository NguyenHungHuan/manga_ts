export interface data<T> {
  comics: T
  current_page: number
  total_pages: number
}

export type comics = {
  authors: string | string[]
  followers: string
  genres: [
    {
      id: string
      name: string
    }
  ]
  id: string
  is_trending: boolean
  last_chapter: {
    id: number
    name: string
  }
  other_names: string[]
  short_description: string
  status: string
  thumbnail: string
  title: string
  total_comments: string
  total_views: number
  updated_at: string
}

export type dataRecommend = Omit<comics, 'last_chapter'> & {
  lastest_chapter: {
    id: number
    name: string
  }
}
