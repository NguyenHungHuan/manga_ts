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
                      'bg-primary text-white hover:no-underline': queryConfig.status === 'updating',
                      'bg-transparent text-primary': queryConfig.status !== 'updating'
                    }
                  )}
                  to={{
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1',
                      status: 'updating'
                    }).toString()
                  }}
                >
                  cập nhật
                </Link>
              </div>
            ) : (
              <h2 className='capitalize font-semibold text-black text-2xl'>
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
          <div className='mt-6 min-h-[600px]'>
            <ul className='grid grid-cols-7 gap-y-5 gap-x-1'>
              {dataComics &&
                dataComics.comics.map((item) => (
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
