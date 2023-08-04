import comicApis from '@/apis/comicApis'
import { Banner, RecentUpdateSlide } from '@/components'
import React from 'react'
import { useQuery } from 'react-query'
import { comics } from '@/types/data'

const Home: React.FC = () => {
  const { data: dataRecommend } = useQuery({
    queryKey: ['recommend-comics'],
    queryFn: () => comicApis.getRecommend(),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataTrending } = useQuery({
    queryKey: ['trending-comics'],
    queryFn: () => comicApis.getTrending(),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataRecentUpdated } = useQuery({
    queryKey: ['recentUpdated-comics'],
    queryFn: () => comicApis.getRecentUpdate(),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataCompleted } = useQuery({
    queryKey: ['completed-comics'],
    queryFn: () => comicApis.getCompleted(),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataRecentUpdatedComics = dataRecentUpdated?.data.comics
  const dataRecommendComics = dataRecommend?.data
  const dataTrendingComics = dataTrending?.data.comics
  const dataCompletedComics = dataCompleted?.data.comics
  console.log(dataRecentUpdatedComics)

  return (
    <div className='container'>
      <Banner />
      <div className='mt-10'>
        <RecentUpdateSlide data={dataRecentUpdatedComics as comics[]}/>
      </div>
    </div>
  )
}

export default Home
