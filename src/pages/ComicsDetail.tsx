import comicApis from '@/apis/comicApis'
import {
  ListChapter,
  ListComment,
  ListDownloadChapter,
  RatingStar,
  SuggestComics
} from '@/components'
import { useScrollTop } from '@/hooks'
import { formatCurrency } from '@/utils/formatNumber'
import PATH from '@/utils/path'
import { useQuery } from 'react-query'
import { Link, createSearchParams, useParams } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import imgError from '@/assets/img/img-error.png'
import imgLoading from '@/assets/img/loading.gif'
import { NotFound } from '@/App'

const ComicsDetail = () => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const description = useRef<HTMLParagraphElement>(null)
  useScrollTop([id])

  const { data, isError } = useQuery({
    queryKey: ['comic_detail', id],
    queryFn: () => comicApis.getComicDetail(id as string),
    staleTime: 3 * 60 * 1000,
    enabled: id !== ''
  })
  const { data: dataWeekly } = useQuery({
    queryKey: [`${PATH.top}${PATH.weekly}`, { page: '1', status: 'all' }],
    queryFn: () =>
      comicApis.getComicsByUrl(`${PATH.top}${PATH.weekly}`, { page: '1', status: 'all' }),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataPopular } = useQuery({
    queryKey: [PATH.popular, { page: '1' }],
    queryFn: () => comicApis.getComicsByUrl(PATH.popular, { page: '1' }),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataPopularComics = useMemo(() => dataPopular?.data.comics, [dataPopular])
  const dataWeeklyComics = useMemo(() => dataWeekly?.data.comics, [dataWeekly])
  const dataComics = data?.data

  useEffect(() => {
    if (description.current) {
      setIsShow(description.current.scrollHeight !== description.current.clientHeight)
    }
  }, [dataComics])

  return (
    <>
      {!(isError || Number(dataComics?.status) === 404) && (
        <>
          <div className='w-full min-h-[400px] relative overflow-hidden'>
            <p
              className='bg-no-repeat bg-cover h-[400px]'
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                backgroundImage: `url('${dataComics?.thumbnail}')`,
                filter: 'blur(60px)'
              }}
            />
          </div>
          <div className='container mt-[-300px] blur-0'>
            <div className='w-full'>
              <div className='h-full container rounded-t-lg bg-white dark:bg-gray-900 px-4 lg:px-10'>
                <div className='pt-[35px] pb-[30px] min-h-[300px]'>
                  {dataComics && (
                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-5'>
                      <figure className='w-[200px] h-[280px] sm:w-[240px] sm:h-[330px] dark:border dark:border-gray-600 -mt-20 flex-shrink-0 rounded-md overflow-hidden shadow-[0_0_5px_#444]'>
                        <img
                          src={dataComics.thumbnail}
                          loading='lazy'
                          alt={dataComics.title}
                          className='h-full w-full object-cover pointer-events-none select-none'
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null
                            currentTarget.src = imgError
                          }}
                        />
                      </figure>
                      <div className='w-full'>
                        <div className='flex items-start lg:justify-between gap-6 -mt-2'>
                          <h2
                            title={dataComics.title}
                            className='font-semibold text-3xl -ml-1 text-black dark:text-white'
                          >
                            {dataComics.title}
                          </h2>
                          <RatingStar rating={dataComics.followers} />
                        </div>
                        <span className='text-base text-black dark:text-white block capitalize mt-1'>
                          tác giả: <strong className='text-primary'>{dataComics.authors}</strong>
                        </span>
                        <p className='flex flex-wrap items-center gap-x-4 gap-y-2 text-base mt-1 text-black dark:text-white capitalize'>
                          <span>
                            Lượt xem:{' '}
                            <strong className='text-[#4b8fd7]'>
                              {formatCurrency(dataComics.total_views)}
                            </strong>
                          </span>
                          <span>
                            theo dõi:{' '}
                            <strong className='text-[#64d363]'>
                              {formatCurrency(dataComics.followers)}
                            </strong>
                          </span>
                        </p>
                        <div className='flex flex-wrap gap-[6px] items-center my-2 mb-3 dark:text-white'>
                          {dataComics.genres.map((genre) => {
                            return genre.id !== undefined ? (
                              <Link
                                to={{
                                  pathname: PATH.genres,
                                  search: createSearchParams({
                                    type: genre.id,
                                    page: '1'
                                  }).toString()
                                }}
                                title={genre.name}
                                key={genre.id}
                              >
                                <span className='py-1 px-2 text-[13px] border border-dashed border-[#d9d9d9] hover:text-primary hover:border-primary truncate'>
                                  {genre.name}
                                </span>
                              </Link>
                            ) : null
                          })}
                        </div>
                        <div className='relative'>
                          <p
                            ref={description}
                            className={`text-base text-black/70 dark:text-gray-300 ${
                              !isOpen && ' overflow-hidden max-h-[72px]'
                            }`}
                          >
                            {dataComics.description}
                          </p>
                          {isShow && isOpen && (
                            <button onClick={() => setIsOpen((prev) => !prev)}>
                              <span className='text-black dark:text-white'>Show less</span>
                            </button>
                          )}{' '}
                          {isShow && !isOpen && (
                            <button
                              className='absolute right-0 bg-white/90 dark:bg-gray-900/90 rounded-full bottom-0 z-10 w-[50px] overflow-hidden'
                              onClick={() => setIsOpen((prev) => !prev)}
                            >
                              <span className='text-black dark:text-white font-medium'>
                                ...more
                              </span>
                            </button>
                          )}
                        </div>
                        <div className='flex items-center gap-3 mt-2'>
                          <Link
                            to={`${PATH.chapters}/${id}/${dataComics.chapters[0].id}`}
                            className='text-white flex-shrink-0 bg-gradient w-[140px] h-[38px] capitalize font-semibold flex items-center justify-center rounded gap-2'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                              aria-hidden='true'
                              className='w-6 h-6'
                              viewBox='0 0 32 32'
                            >
                              <path
                                fill='currentColor'
                                d='M19 10h7v2h-7zm0 5h7v2h-7zm0 5h7v2h-7zM6 10h7v2H6zm0 5h7v2H6zm0 5h7v2H6z'
                              />
                              <path
                                fill='currentColor'
                                d='M28 5H4a2.002 2.002 0 0 0-2 2v18a2.002 2.002 0 0 0 2 2h24a2.002 2.002 0 0 0 2-2V7a2.002 2.002 0 0 0-2-2ZM4 7h11v18H4Zm13 18V7h11v18Z'
                              />
                            </svg>
                            Đọc Ngay
                          </Link>
                          <button
                            onClick={() => {
                              setIsOpenModal(true)
                              document.body.style.overflow = 'hidden'
                            }}
                            className='text-primary border-primary border flex-shrink-0 text-lg w-[140px] h-[38px] capitalize font-semibold flex items-center justify-center rounded gap-2 active:scale-95'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                              aria-hidden='true'
                              className='w-6 h-6'
                              viewBox='0 0 16 16'
                            >
                              <path
                                fill='currentColor'
                                d='M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z'
                              />
                              <path
                                fill='currentColor'
                                d='M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z'
                              />
                            </svg>
                            Tải xuống
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {!dataComics && skeleton()}
                </div>
                <div className='flex gap-4 lg:gap-[30px] justify-between'>
                  <div className='flex-1 max-w-[852px]'>
                    <section className='min-h-[400px]'>
                      <h3 className='flex items-center gap-2 border-b border-slate-200 dark:border-gray-500 pb-1 capitalize text-primary text-lg'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          xmlnsXlink='http://www.w3.org/1999/xlink'
                          aria-hidden='true'
                          className='w-6 h-6 flex-shrink-0 text-primary'
                          viewBox='0 0 32 32'
                        >
                          <path
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M16 7S9 1 2 6v22c7-5 14 0 14 0s7-5 14 0V6c-7-5-14 1-14 1Zm0 0v21'
                          />
                        </svg>
                        Danh sách chương
                      </h3>
                      {dataComics && id && <ListChapter id={id} data={dataComics.chapters} />}
                      {!dataComics && skeletonListChapter()}
                    </section>
                    <section className='mt-2'>{id && <ListComment id={id} />}</section>
                  </div>
                  <div className='flex-shrink-0 w-[238px] hidden md:flex flex-col gap-6'>
                    <>
                      <h4 className='px-5 pl-3 py-3 border dark:border-gray-500 flex items-center font-semibold text-lg text-black dark:text-white'>
                        Top tuần
                      </h4>
                      <div className='border border-t-0 dark:border-gray-500 flex flex-col -mt-6 min-h-[600px]'>
                        {dataWeeklyComics &&
                          dataWeeklyComics
                            .slice(0, 10)
                            .map((item, i) => (
                              <SuggestComics
                                key={item.id}
                                index={i}
                                title={item.title}
                                src={item.thumbnail}
                                idChapter={item.last_chapter.id}
                                chapter={item.last_chapter.name}
                                genres={item.genres.map((item) => item.name) as [string]}
                                idComic={item.id}
                              />
                            ))}
                        {!dataWeeklyComics && (
                          <div className='flex items-center justify-center gap-2 h-[300px] text-black dark:text-white'>
                            <img src={imgLoading} alt='loading icon' loading='lazy' />
                            Loading...
                          </div>
                        )}
                      </div>
                    </>
                    <div className='sticky top-[50px]'>
                      <h4 className='px-5 pl-3 py-3 border dark:border-gray-500 flex items-center font-semibold text-lg text-black dark:text-white'>
                        Nổi bật
                      </h4>
                      <div className='border border-t-0 dark:border-gray-500 flex flex-col min-h-[600px]'>
                        {dataPopularComics &&
                          dataPopularComics
                            .slice(0, 7)
                            .map((item, i) => (
                              <SuggestComics
                                key={item.id}
                                index={i}
                                title={item.title}
                                src={item.thumbnail}
                                idChapter={item.last_chapter.id}
                                chapter={item.last_chapter.name}
                                genres={item.genres.map((item) => item.name) as [string]}
                                idComic={item.id}
                              />
                            ))}
                        {!dataPopularComics && (
                          <div className='flex items-center justify-center gap-2 h-[300px] text-black dark:text-white'>
                            <img src={imgLoading} alt='loading icon' loading='lazy' />
                            Loading...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            onMouseDown={() => {
              setIsOpenModal(false)
              document.body.style.overflow = 'auto'
            }}
            className={`fixed inset-0 bg-[rgba(0,0,0,.6)] z-30 flex flex-col items-center justify-center duration-500 transition-all ${
              isOpenModal ? ' opacity-100 pointer-events-auto' : ' opacity-0 pointer-events-none'
            }`}
          >
            <div
              className='bg-white dark:bg-gray-900 p-5 rounded-lg'
              onMouseDown={(e) => e.stopPropagation()}
            >
              <section className='w-full sm:w-[450px] md:w-[550px] lg:w-[700px]'>
                {dataComics && id && <ListDownloadChapter id={id} data={dataComics.chapters} />}
              </section>
            </div>
          </div>
        </>
      )}
      {(isError || Number(dataComics?.status) === 404) && <NotFound />}
    </>
  )
}
export default ComicsDetail

const skeleton = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-5'>
      <div className='-mt-20 flex items-center justify-center w-[200px] h-[280px] sm:w-[240px] sm:h-[330px] rounded-md bg-gray-300 dark:bg-gray-700 flex-shrink-0'>
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
      <div className='w-full overflow-hidden animate-pulse'>
        <div className='flex items-center xl:justify-between gap-6'>
          <div className='-ml-1 h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-[450px]' />
          <div className='hidden lg:block -ml-1 h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48' />
        </div>
        <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4' />
        <div className='flex items-center gap-4'>
          <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mt-3' />
          <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mt-3' />
        </div>
        <div className='flex items-center gap-[6px] my-4'>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className='h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-16' />
            ))}
        </div>
        <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-3' />
        <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-2' />
        <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-2' />
        <div className='flex items-center gap-3 mt-4'>
          <div className='w-[140px] h-[38px] bg-gray-200 rounded-md dark:bg-gray-700' />
          <div className='w-[140px] h-[38px] bg-gray-200 rounded-md dark:bg-gray-700' />
        </div>
      </div>
    </div>
  )
}

const skeletonListChapter = () => {
  return (
    <div className='animate-pulse'>
      <div className='my-5 h-[30px] bg-gray-200 rounded-md dark:bg-gray-700 w-[70px]' />
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5 text-gray-800 font-semibold text-sm flex-wrap'>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div key={i} className='rounded-sm h-[38px] pt-2 px-4 bg-gray-200 dark:bg-gray-700' />
          ))}
      </div>
    </div>
  )
}
