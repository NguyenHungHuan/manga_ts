import comicApis from '@/apis/comicApis'
import { CardItem, MiniPagination, Pagination } from '@/components'
import { useQueryConfig, useScrollTop } from '@/hooks'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, createSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/grid'

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
    () => dataGenreComics?.find((item) => item.id === type)?.description,
    [type, dataGenreComics]
  )

  const [totalPage, setTotalPage] = useState<number>()
  useEffect(() => {
    if (dataComics) {
      setTotalPage(dataComics.total_pages as number)
    }
  }, [type, dataComics])

  return (
    <>
      <div className='p-5 pb-3 bg-[#f8f8f9] min-h-[230px]'>
        <div className='min-h-[145px]'>
          {dataGenreComics && (
            <div className='container border-t-4 border-primary bg-white py-5 px-6 rounded shadow cursor-grab'>
              <Swiper
                slidesPerView={8}
                freeMode={true}
                grid={{
                  rows: 3,
                  fill: 'row'
                }}
                grabCursor={true}
                spaceBetween={4}
                modules={[FreeMode, Grid]}
              >
                {dataGenreComics.map((item) => (
                  <SwiperSlide key={item.id} className='flex-1 max-w-[130px]'>
                    <Link
                      className={classNames(
                        'border text-center px-12 py-2 flex items-center justify-center font-semibold leading-5 whitespace-nowrap',
                        {
                          'text-white bg-primary': type === item.id,
                          'hover:text-primary hover:border-primary': type !== item.id
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
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
        <div className='container'>
          <div className='mt-2 bg-gradient text-white rounded-lg p-2 pr-4 shadow flex items-center gap-2'>
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
            <p className='text-lg font-semibold'>{descGenre}</p>
          </div>
        </div>
      </div>

      <div className='container'>
        {data?.data.status === 404 || isError ? (
          <>not found</>
        ) : (
          <>
            <div className='mt-8 flex items-center justify-between h-9'>
              <h2 className='capitalize font-semibold text-black text-2xl'>
                <strong className='text-primary'>Thể loại</strong> - trang {queryConfig.page}
              </h2>
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
    </>
  )
}

export default ComicsList
