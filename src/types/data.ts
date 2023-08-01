export interface data {
  comics: comics[]
  current_page: number
  total_pages: number
}

export type comics = {
  authors: string
  followers: string
  genres: [
    {
      id: string
      name: string
    }
  ]
  id: string
  is_trending: true
  lastest_chapters: [
    {
      id: number
      name: string
      updated_at: string
    }
  ]
  other_names: string[]
  short_description: string
  status: string
  thumbnail: string
  title: string
  total_comments: string
  total_views: string
  updated_at: string
}
