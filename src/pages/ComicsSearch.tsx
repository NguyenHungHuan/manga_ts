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
        <div className='flex items-center gap-2'>
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
        <div className=''>
          {dataSearch?.total_pages && (
            <MiniPagination
              queryConfig={queryConfig}
              page={Number(queryConfig.page)}
              totalPage={dataSearch?.total_pages}
            />
          )}
        </div>
      </div>
      <div className='mt-8 min-h-[550px]'>
        {dataSearch &&
          !isFetching &&
          dataSearch?.comics.length > 0 &&
          renderSwiperSlide(dataSearch.comics, 2, '6')}
        {Array.isArray(dataSearch?.comics) && !dataSearch?.comics.length && isError && (
          <div className='flex items-center justify-center text-2xl h-[550px]'>
            Không tìm thấy truyện với kết quả
          </div>
        )}
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
