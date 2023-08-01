import comicApis from '@/apis/comicApis'
import React from 'react'
import { useQuery } from 'react-query'

const Home: React.FC = () => {
  const { data: dataTrendingComics } = useQuery({
    queryKey: ['trending-comics'],
    queryFn: () => comicApis.getTrending()
  })
  const dataTrending = dataTrendingComics?.data

  return (
    <div>
      {dataTrending?.comics.map((item) => (
        <img key={item.id} src={item.thumbnail} alt={item.title} title={item.title} className='' />
      ))}
    </div>
  )
}

export default Home
