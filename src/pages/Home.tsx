import comicApis from '@/apis/comicApis'
import iconPopular from '@/assets/img/icon-popular.png'
import iconRecentUpdate from '@/assets/img/icon-recentUpdate.png'
import iconRecommend from '@/assets/img/icon-recommend.png'
import { Banner } from '@/components'
import {
  CompletedPreviewComics,
  RecentUpdateComics,
  RecommendComics,
  SlidePreviewComics,
  TopPreviewComics
} from '@/components/Preview'
import { useQueryConfig } from '@/hooks'
import { comics, dataRecommend } from '@/types/data'
import PATH from '@/utils/path'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { Link, createSearchParams } from 'react-router-dom'

const Home: React.FC = () => {
  const queryConfig = useQueryConfig()
  const { data: dataRecentUpdated } = useQuery({
    queryKey: [PATH.recent, queryConfig],
    queryFn: () => comicApis.getComicsByUrl(PATH.recent, queryConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataPopular } = useQuery({
    queryKey: [PATH.popular, queryConfig],
    queryFn: () => comicApis.getComicsByUrl(PATH.popular, queryConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataCompleted } = useQuery({
    queryKey: [PATH.completed, queryConfig],
    queryFn: () => comicApis.getComicsByUrl(PATH.completed, queryConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataRecommend } = useQuery({
    queryKey: ['recommend-comics'],
    queryFn: () => comicApis.getRecommend(),
    staleTime: 3 * 60 * 1000
  })
  const dataRecentUpdatedComics = useMemo(() => dataRecentUpdated?.data.comics, [dataRecentUpdated])
  const dataRecommendComics = useMemo(() => dataRecommend?.data, [dataRecommend])
  const dataPopularComics = useMemo(() => dataPopular?.data.comics, [dataPopular])
  const dataCompletedComics = useMemo(() => dataCompleted?.data.comics, [dataCompleted])

  return (
    <div className='container'>
      <Banner />
      <section className='mt-10'>
        {titleComicsPreview(iconRecentUpdate, 'Mới cập nhật', PATH.recent)}
        <RecentUpdateComics data={dataRecentUpdatedComics as comics[]} />
      </section>
      <section className='mt-16'>
        <TopPreviewComics />
      </section>
      <section className='mt-10'>
        {titleComicsPreview(iconRecommend, 'Đề xuất', '', false)}
        <RecommendComics data={dataRecommendComics as dataRecommend[]} />
      </section>
      <section className='mt-16'>
        {titleComicsPreview(iconPopular, 'Nổi bật', PATH.popular)}
        <SlidePreviewComics data={dataPopularComics as comics[]} />
      </section>
      <section className='mt-10'>
        <div className='flex items-end justify-between'>
          <div className='flex items-center gap-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              aria-hidden='true'
              role='img'
              className='text-primary w-8 h-8'
              viewBox='0 0 256 256'
              data-v-c3ad5561
            >
              <path
                fill='currentColor'
                d='M225.86 102.82c-3.77-3.94-7.67-8-9.14-11.57c-1.36-3.27-1.44-8.69-1.52-13.94c-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52c-3.56-1.47-7.63-5.37-11.57-9.14C146.28 23.51 138.44 16 128 16s-18.27 7.51-25.18 14.14c-3.94 3.77-8 7.67-11.57 9.14c-3.25 1.36-8.69 1.44-13.94 1.52c-9.76.15-20.82.31-28.51 8s-7.8 18.75-8 28.51c-.08 5.25-.16 10.67-1.52 13.94c-1.47 3.56-5.37 7.63-9.14 11.57C23.51 109.72 16 117.56 16 128s7.51 18.27 14.14 25.18c3.77 3.94 7.67 8 9.14 11.57c1.36 3.27 1.44 8.69 1.52 13.94c.15 9.76.31 20.82 8 28.51s18.75 7.85 28.51 8c5.25.08 10.67.16 13.94 1.52c3.56 1.47 7.63 5.37 11.57 9.14c6.9 6.63 14.74 14.14 25.18 14.14s18.27-7.51 25.18-14.14c3.94-3.77 8-7.67 11.57-9.14c3.27-1.36 8.69-1.44 13.94-1.52c9.76-.15 20.82-.31 28.51-8s7.85-18.75 8-28.51c.08-5.25.16-10.67 1.52-13.94c1.47-3.56 5.37-7.63 9.14-11.57c6.63-6.9 14.14-14.74 14.14-25.18s-7.51-18.27-14.14-25.18Zm-52.2 6.84l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32Z'
              />
            </svg>
            <h2 className='capitalize font-semibold mt-1 text-[28px] text-black leading-5'>
              Đã hoàn thành
            </h2>
          </div>
          <Link
            to={{
              pathname: PATH.completed,
              search: createSearchParams({
                page: '1'
              }).toString()
            }}
            className='flex items-center gap-1 text-sm text-black hover:text-primary'
          >
            <span>Tất cả</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </Link>
        </div>
        <CompletedPreviewComics data={dataCompletedComics as comics[]} />
      </section>
    </div>
  )
}
export default Home

const titleComicsPreview = (img: string, title: string, link?: string, showMore?: boolean) => {
  const isShowMore = showMore === undefined ? true : false

  return (
    <div className='flex items-end justify-between'>
      <div className='flex items-center gap-4'>
        <img src={img} alt='Icon' className='w-auto h-[32px]' loading='lazy' />
        <h2 className='capitalize font-semibold mt-1 text-[28px] text-black leading-5'>{title}</h2>
      </div>
      {isShowMore && (
        <Link
          to={{
            pathname: link,
            search: createSearchParams({
              page: '1'
            }).toString()
          }}
          className='flex items-center gap-1 text-sm text-black hover:text-primary'
        >
          <span>Tất cả</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </Link>
      )}
    </div>
  )
}
