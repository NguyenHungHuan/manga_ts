import comicApis from '@/apis/comicApis'
import { ListChapter, ListComment, RatingStar, SuggestComics } from '@/components'
import { useScrollTop } from '@/hooks'
import { formatCurrency } from '@/utils/formatNumber'
import PATH from '@/utils/path'
import { useQuery } from 'react-query'
import { Link, createSearchParams, useParams } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'

const ComicsDetail = () => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)
  const description = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (description.current) {
      setIsShow(description.current.scrollHeight !== description.current.clientHeight)
    }
  }, [id])

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

  return (
    <>
      <div className='w-full min-h-[400px] relative overflow-hidden'>
        <div
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
                  <div className='w-[240px] h-[330px] -mt-20 flex-shrink-0 rounded-md overflow-hidden shadow-[0_0_5px_#444]'>
                    <img
                      src={dataComics.thumbnail}
                      alt={dataComics.title}
                      className='h-full w-full object-cover pointer-events-none select-none'
                    />
                  </div>
                  <div className='w-full'>
                    <div className='flex items-center justify-between gap-6 -mt-2'>
                      <h2 className='font-semibold text-3xl line-clamp-1 -ml-1'>
                        {dataComics.title}
                      </h2>
                      <RatingStar rating={dataComics.followers} />
                    </div>
                    <span className='text-base text-gray-400 block capitalize mt-1'>
                      tác giả: <strong className='text-black'>{dataComics.authors}</strong>
                    </span>
                    <p className='flex items-center gap-4 text-base mt-1 text-gray-400 capitalize'>
                      <span>
                        Lượt xem:{' '}
                        <strong className='text-black'>
                          {formatCurrency(dataComics.total_views)}
                        </strong>
                      </span>
                      <span>
                        theo dõi:{' '}
                        <strong className='text-black'>
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
                      className={`text-base text-black/60 min-h-[72px] ${
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
                      <Link
                        to={PATH.home}
                        className='text-primary border-primary border flex-shrink-0 text-lg w-[140px] h-[38px] capitalize font-semibold flex items-center justify-center rounded gap-2'
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
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='flex gap-[30px] justify-between'>
              <div className='flex-1'>
                <div className='min-h-[500px]'>
                  {dataComics && id && <ListChapter id={id} data={dataComics.chapters} />}
                </div>
                <div className='mt-2'>{id && <ListComment id={id} />}</div>
              </div>
              <div className='w-[238px] flex flex-col gap-6'>
                <div>
                  <div className='px-5 pl-3 py-3 border flex items-center'>
                    <span className='font-semibold text-lg'>Top tuần</span>
                  </div>
                  <div className='border border-t-0 flex flex-col'>
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
                </div>
                <div className='sticky top-[50px]'>
                  <div className='px-5 pl-3 py-3 border flex items-center'>
                    <span className='font-semibold text-lg'>Nổi bật</span>
                  </div>
                  <div className='border border-t-0 flex flex-col'>
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
      {(isError || Number(dataComics?.status) === 404) && <div className=''>not found</div>}
    </>
  )
}

export default ComicsDetail
