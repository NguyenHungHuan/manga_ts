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
          <div className='h-full container rounded-t-lg bg-white px-10'>
            <div className='pt-[35px] pb-[30px] min-h-[300px]'>
              {dataComics && (
                <div className='flex gap-5'>
                  <figure className='w-[240px] h-[330px] -mt-20 flex-shrink-0 rounded-md overflow-hidden shadow-[0_0_5px_#444]'>
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
                    <div className='flex items-center justify-between gap-6 -mt-2'>
                      <h2 className='font-semibold text-3xl line-clamp-1 -ml-1'>
                        {dataComics.title}
                      </h2>
                      <RatingStar rating={dataComics.followers} />
                    </div>
                    <span className='text-base text-black block capitalize mt-1'>
                      tác giả: <strong className='text-primary'>{dataComics.authors}</strong>
                    </span>
                    <p className='flex items-center gap-4 text-base mt-1 text-black capitalize'>
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
                    <div className='flex gap-[6px] items-center my-2'>
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
                    <p
                      ref={description}
                      className={`text-base text-black/80 min-h-[72px] ${
                        !isOpen && ' line-clamp-3'
                      }`}
                    >
                      {dataComics.description}
                    </p>
                    {isShow && (
                      <button onClick={() => setIsOpen((prev) => !prev)}>
                        {isOpen ? 'Show less' : 'Show more'}
                      </button>
                    )}
                    <div className='flex items-center gap-3 mt-1'>
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
            </div>
            <div className='flex gap-[30px] justify-between'>
              <div className='flex-1 max-w-[852px]'>
                <section className='min-h-[500px]'>
                  {dataComics && id && <ListChapter id={id} data={dataComics.chapters} />}
                </section>
                <section className='mt-2'>{id && <ListComment id={id} />}</section>
              </div>
              <div className='flex-shrink-0 w-[238px] flex flex-col gap-6'>
                <>
                  <h4 className='px-5 pl-3 py-3 border flex items-center font-semibold text-lg'>
                    Top tuần
                  </h4>
                  <div className='border border-t-0 flex flex-col -mt-6 min-h-[800px]'>
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
                  </div>
                </>
                <div className='sticky top-[50px]'>
                  <h4 className='px-5 pl-3 py-3 border flex items-center font-semibold text-lg'>
                    Nổi bật
                  </h4>
                  <div className='border border-t-0 flex flex-col min-h-[800px]'>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(isError || Number(dataComics?.status) === 404) && <>not found</>}
      <div
        onMouseDown={() => {
          setIsOpenModal(false)
          document.body.style.overflow = 'auto'
        }}
        className={`fixed inset-0 bg-[rgba(0,0,0,.6)] z-30 flex flex-col items-center justify-center duration-500 transition-all ${
          isOpenModal ? ' opacity-100 pointer-events-auto' : ' opacity-0 pointer-events-none'
        }`}
      >
        <div className='bg-white p-5 rounded-lg' onMouseDown={(e) => e.stopPropagation()}>
          <section className='w-[700px]'>
            {dataComics && id && <ListDownloadChapter id={id} data={dataComics.chapters} />}
          </section>
        </div>
      </div>
    </>
  )
}

export default ComicsDetail
