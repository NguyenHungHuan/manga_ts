import comicApis from '@/apis/comicApis'
import { CardItem, MiniPagination, Pagination } from '@/components'
import { useQueryConfig, useScrollTop, useTitle } from '@/hooks'
import PATH from '@/utils/path'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, createSearchParams, useLocation } from 'react-router-dom'
import classNames from 'classnames'

const ComicsList = () => {
  const { pathname } = useLocation()
  const queryConfig = useQueryConfig()
  const title = useMemo(() => useTitle(pathname), [pathname])
  const isTopAndNew = useMemo(
    () => pathname.includes(PATH.new) || pathname.includes(PATH.top),
    [pathname]
  )
  useScrollTop([pathname, queryConfig])

  const { data, isError } = useQuery({
    queryKey: [pathname, queryConfig],
    queryFn: () => comicApis.getComicsByUrl(pathname, queryConfig),
    staleTime: 3 * 60 * 1000,
    enabled: pathname !== PATH.new
  })

  const { data: dataNew, isError: isErrorNew } = useQuery({
    queryKey: [pathname, queryConfig],
    queryFn: () => comicApis.getNew(queryConfig),
    staleTime: 3 * 60 * 1000,
    enabled: pathname === PATH.new
  })

  const dataComics = useMemo(
    () => (pathname !== PATH.new ? data?.data : dataNew?.data),
    [pathname, data, dataNew]
  )

  const [totalPage, setTotalPage] = useState<number>()
  useEffect(() => {
    if (dataComics) {
      setTotalPage(dataComics.total_pages as number)
    }
  }, [pathname, dataComics])

  return (
    <div className='container'>
      {data?.data.status === 404 || isError || isErrorNew ? (
        <>not found</>
      ) : (
        <>
          <div className='mt-8 flex items-center justify-between h-9'>
            {isTopAndNew ? (
              <div className='flex items-center gap-2'>
                <Link
                  className={classNames(
                    'capitalize text-center px-2 py-1 rounded-md border border-primary leading-5 hover:underline',
                    {
                      'bg-primary text-white hover:no-underline': queryConfig.status === 'all',
                      'bg-transparent text-primary': queryConfig.status !== 'all'
                    }
                  )}
                  to={{
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1',
                      status: 'all'
                    }).toString()
                  }}
                >
                  tất cả
                </Link>
                <Link
                  className={classNames(
                    'capitalize text-center px-2 py-1 rounded-md border border-primary leading-5 hover:underline',
                    {
                      'bg-primary text-white hover:no-underline':
                        queryConfig.status === 'completed',
                      'bg-transparent text-primary': queryConfig.status !== 'completed'
                    }
                  )}
                  to={{
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1',
                      status: 'completed'
                    }).toString()
                  }}
                >
                  hoàn thành
                </Link>
                <Link
                  className={classNames(
                    'capitalize text-center px-2 py-1 rounded-md border border-primary leading-5 hover:underline',
                    {
                      'bg-primary text-white hover:no-underline': queryConfig.status === 'ongoing',
                      'bg-transparent text-primary': queryConfig.status !== 'ongoing'
                    }
                  )}
                  to={{
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1',
                      status: 'ongoing'
                    }).toString()
                  }}
                >
                  cập nhật
                </Link>
              </div>
            ) : (
              <h2 className='capitalize font-semibold text-black dark:text-white text-2xl'>
                <strong className='text-primary'>{title}</strong> - trang {queryConfig.page}
              </h2>
            )}
            {totalPage && (
              <MiniPagination
                queryConfig={queryConfig}
                page={Number(queryConfig.page)}
                totalPage={totalPage}
              />
            )}
          </div>
          {dataComics && (
            <div className='mt-6 min-h-[600px]'>
              <ul className='grid grid-cols-7 gap-y-5 gap-x-1'>
                {dataComics.comics.map((item) => (
                  <li key={item.id}>
                    <CardItem
                      chapterName={item.last_chapter.name}
                      chapterId={item.last_chapter.id}
                      description={item.short_description}
                      id={item.id}
                      thumbnail={item.thumbnail}
                      title={item.title}
                      updated_at={item.updated_at}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!dataComics && (
            <div className='mt-6 min-h-[600px]'>
              <ul className='grid grid-cols-7 gap-y-5 gap-x-1'>{skeleton()}</ul>
            </div>
          )}
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
  )
}
export default ComicsList

const skeleton = () => {
  return (
    <>
      {Array(21)
        .fill(0)
        .map((_, i) => (
          <li key={i} className='w-full h-[292px] overflow-hidden animate-pulse'>
            <div className='flex items-center justify-center w-full h-[220px] bg-gray-300 dark:bg-gray-700 flex-shrink-0'>
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
