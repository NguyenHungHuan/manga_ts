import comicApis from '@/apis/comicApis'
import { MiniPagination, Pagination } from '@/components'
import { renderSwiperSlide } from '@/components/Preview/RecentUpdateComics'
import { useQueryConfig, useScrollTop } from '@/hooks'
import PATH from '@/utils/path'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

const ComicsSearch = () => {
  const queryConfig = useQueryConfig()
  useScrollTop([queryConfig.q, queryConfig.page])

  const { data, isError, isFetching } = useQuery({
    queryKey: ['search-comic', queryConfig],
    queryFn: () => comicApis.getSearch(queryConfig),
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true
  })
  const dataSearch = data?.data

  return (
    <div className='container'>
      <div className='mt-6 flex items-center justify-between'>
        <div className='flex items-center gap-2 text-black dark:text-white'>
          <Link to={PATH.home} className='flex items-center gap-1 hover:text-primary text-lg'>
            Trang chủ{' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              aria-hidden='true'
              className='w-5 h-5'
              viewBox='0 0 48 48'
            >
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={3}
                d='M19 12L31 24L19 36'
              />
            </svg>
          </Link>
          <span className='flex items-center gap-1 text-lg'>
            Tìm kiếm{' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              aria-hidden='true'
              className='w-5 h-5'
              viewBox='0 0 48 48'
            >
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={3}
                d='M19 12L31 24L19 36'
              />
            </svg>
          </span>
          <span className='text-primary text-lg'>"{queryConfig.q}"</span>
        </div>
        {dataSearch?.total_pages && (
          <MiniPagination
            queryConfig={queryConfig}
            page={Number(queryConfig.page)}
            totalPage={dataSearch?.total_pages}
          />
        )}
      </div>
      <div className='mt-8 min-h-[550px]'>
        {dataSearch &&
          !isFetching &&
          dataSearch?.comics.length > 0 &&
          renderSwiperSlide(dataSearch.comics, 2, '6')}
        {!isFetching && ((Array.isArray(dataSearch?.comics) && !dataSearch?.comics.length) || isError) && (
          <div className='flex items-center justify-center text-2xl h-[550px] text-black dark:text-white'>
            Không tìm thấy truyện với kết quả
          </div>
        )}
        {isFetching && Skeleton()}
      </div>
      <div className='mt-14'>
        {dataSearch?.total_pages && (
          <Pagination
            queryConfig={queryConfig}
            page={Number(queryConfig.page)}
            totalPage={dataSearch?.total_pages}
          />
        )}
      </div>
    </div>
  )
}
export default ComicsSearch

const Skeleton = () => {
  return (
    <div className='grid grid-cols-12 gap-6 h-full w-full animate-pulse'>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className='md:flex col-span-6'>
            <div className='flex items-center justify-center w-[165px] h-[220px] bg-gray-300 dark:bg-gray-700 flex-shrink-0'>
              <svg
                className='w-10 h-10 text-gray-200 dark:text-gray-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 18'
              >
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>
            </div>
            <div className='w-full pl-[15px] pr-2 flex flex-col flex-1 justify-around'>
              <div>
                <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4 -mt-2' />
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 -mt-2' />
              </div>
              <div>
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-2.5' />
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[350px]  mb-2.5' />
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[300px]  mb-2.5' />
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-5 bg-gray-200 rounded-md dark:bg-gray-700 w-14' />
                <div className='h-5 bg-gray-200 rounded-md dark:bg-gray-700 w-14' />
                <div className='h-5 bg-gray-200 rounded-md dark:bg-gray-700 w-14' />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
