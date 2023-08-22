export interface dataComics {
  comics: comics[]
  current_page: number
  total_pages: number
  status: number
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

export type dataGenres = [
  {
    id: string
    name: string
    description: string
  }
]

export type comicsDetail = {
  title: string
  thumbnail: string
  description: string
  authors: string
  status: string
  genres: [
    {
      id: string
      name: string
    }
  ]
  total_views: 403513975
  followers: 157303759
  chapters: [
    {
      id: number
      name: string
    }
  ]
  id: string
  other_names: Array<string>
}

export type comicsChapter = [
  {
    id: number
    name: string
  }
]

export type comicsComment = {
  comments: [
    {
      avatar: string
      username: string
      chapter: string
      content: string
      stickers: [string]
      replies: [
        {
          avatar: string
          username: string
          content: string
          stickers: [string]
          created_at: string
          vote_count: number
          mention_user: string
        }
      ]
      created_at: string
      vote_count: number
    }
  ]
  total_comments: number
  total_pages: number
  current_page: number
}

export type comicSingleChapter = {
  images: [
    {
      page: number
      src: string
    }
  ]
  chapters: [
    {
      id: number
      name: string
    }
  ]
  chapter_name: string
  comic_name: string
}

export type comicSuggestSearch = [{
  id: string
  title: string
  thumbnail: string
  lastest_chapter: string
  genres: [string]
  authors: string
}]
