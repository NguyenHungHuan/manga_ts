import comicApis from '@/apis/comicApis'
import { CardItem, MiniPagination, Pagination } from '@/components'
import { useQueryConfig, useScrollTop } from '@/hooks'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, createSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import { NotFound } from '@/App'

const ComicsList = () => {
  const queryConfig = useQueryConfig()
  useScrollTop([queryConfig])
  const type = useMemo(
    () => (queryConfig.type !== undefined ? queryConfig.type : 'all'),
    [queryConfig.type]
  )

  const { data: dataGenres } = useQuery({
    queryKey: ['genres'],
    queryFn: () => comicApis.getGenre(),
    staleTime: 3 * 60 * 1000
  })
  const { data, isError } = useQuery({
    queryKey: ['comicByGenre', type, queryConfig.page],
    queryFn: () => comicApis.getComicsByGenre(type || 'all', queryConfig),
    staleTime: 3 * 60 * 1000
  })
  const dataComics = data?.data
  const dataGenreComics = dataGenres?.data

  const descGenre = useMemo(
    () => dataGenreComics?.find((item) => item.id === type ? item.id === type : 'all')?.description,
    [type, dataGenreComics]
  )

  const [totalPage, setTotalPage] = useState<number>()
  useEffect(() => {
    if (dataComics) {
      setTotalPage(dataComics.total_pages as number)
    }
  }, [type, dataComics])

  useEffect(() => {
    document.getElementById(type as string)?.scrollIntoView({ block: 'center' })
  }, [type])

  return (
    <>
      <div className='px-5 py-4 bg-[#f8f8f9] dark:bg-gray-800'>
        <ul className='container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-2 max-h-[154px] overflow-auto border-t-4 border-primary bg-white dark:bg-gray-900 py-3 px-2 sm:px-6 rounded shadow'>
          {dataGenreComics &&
            dataGenreComics.map((item) => (
              <li key={item.id} id={item.id}>
                <Link
                  className={classNames(
                    'border dark:border-gray-600 text-black dark:text-white text-center min-w-[100px] sm:min-w-[130px] overflow-hidden rounded-md px-12 py-2 flex items-center justify-center font-semibold leading-5 whitespace-nowrap',
                    {
                      'text-white bg-primary': type === item.id ? type === item.id : item.id === 'all',
                      'hover:text-primary hover:border-primary dark:hover:text-primary dark:hover:border-primary':
                        type !== item.id
                    }
                  )}
                  to={{
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1',
                      type: item.id
                    }).toString()
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          {!dataGenreComics && skeletonGenre()}
        </ul>
      </div>

      <div className='container px-4 xl:px-0'>
        {data?.data.status === 404 || isError ? (
          <NotFound />
        ) : (
          <>
            <div className='mt-8 flex items-center justify-between h-9'>
              <h2 className='capitalize font-semibold text-black dark:text-white text-2xl'>
                <strong className='text-primary'>Thể loại</strong>
                <span className='hidden md:inline-block'> - trang {queryConfig.page}</span>
              </h2>
              {totalPage && (
                <MiniPagination
                  queryConfig={queryConfig}
                  page={Number(queryConfig.page)}
                  totalPage={totalPage}
                />
              )}
            </div>
            <div className='bg-gradient text-white rounded-lg p-2 pr-4 mt-3 shadow flex items-center gap-2'>
              <svg
                data-v-c3ad5561
                data-v-0eca6ff4
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                aria-hidden='true'
                role='img'
                className='w-8 h-8 fill-current text-white flex-shrink-0'
                viewBox='0 0 16 16'
              >
                <path d='M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm.75 3.5a.749.749 0 1 1-1.499 0a.749.749 0 0 1 1.498 0ZM8 7a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 7Z' />
              </svg>
              {descGenre && <p className='text-lg font-semibold'>{descGenre}</p>}
              {!descGenre && (
                <span className='h-3 bg-gray-50 rounded-full w-[600px] animate-pulse' />
              )}
            </div>
            <div className='mt-6 min-h-[600px]'>
              <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 xl:gap-x-[3px] gap-y-5'>
                {dataComics &&
                  dataComics.comics.map((item) => (
                    <li key={item.id}>
                      <CardItem data={item} />
                    </li>
                  ))}
                {!dataComics && skeletonListComic()}
              </ul>
            </div>
            <div className='mt-6'>
              {totalPage && (
                <Pagination
                  queryConfig={queryConfig}
                  page={Number(queryConfig.page)}
                  totalPage={totalPage}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
export default ComicsList

const skeletonGenre = () => {
  return (
    <>
      {Array(24)
        .fill(0)
        .map((_, i) => (
          <li key={i} className='col-span-1 flex-shrink-0'>
            <div className='min-w-[130px] h-[34px] px-12 py-2 bg-gray-200 rounded-md dark:bg-gray-700' />
          </li>
        ))}
    </>
  )
}

const skeletonListComic = () => {
  return (
    <>
      {Array(21)
        .fill(0)
        .map((_, i) => (
          <li key={i} className='w-full min-h-[300px] overflow-hidden animate-pulse'>
            <div className='flex items-center justify-center w-full h-[240px] lg:h-[220px] bg-gray-300 dark:bg-gray-700 flex-shrink-0'>
              <svg
                className='w-16 h-16 text-gray-200 dark:text-gray-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 18'
              >
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>
            </div>
            <div className='mt-2 flex flex-col'>
              <span className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4 mt-1' />
              <span className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2' />
              <span className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32' />
            </div>
          </li>
        ))}
    </>
  )
}
