import comicApis from '@/apis/comicApis'
import { ListComment } from '@/components'
import { useScrollTop } from '@/hooks'
import PATH from '@/utils/path'
import classNames from 'classnames'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const ComicsChapter = () => {
  const { id, idChapter } = useParams()
  const navigate = useNavigate()
  useScrollTop([idChapter])
  const [openList, setOpenList] = useState<boolean>(false)

  const { data, isFetching } = useQuery({
    queryKey: ['comic_chapter', id, idChapter],
    queryFn: () => comicApis.getComicChapter(id as string, idChapter as string),
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true,
    enabled: id !== '' && idChapter !== ''
  })
  const dataChapter = data?.data

  const handleChangeEpisode = (type: 'prev' | 'next') => {
    if (dataChapter) {
      const episodes = [...dataChapter.chapters].reverse()
      const chapterIdx = episodes.findIndex(
        (chapter: { id: number; name: string }) => chapter.id === Number(idChapter)
      )
      const nextChapterIdx = chapterIdx + (type === 'next' ? 1 : -1)
      navigate(`${PATH.chapters}/${id}/${episodes[nextChapterIdx].id}`)
    }
  }

  return (
    <div>
      <div className='min-h-[60px] sticky top-0 z-20 bg-white shadow-lg'>
        <div className='container max-w-4xl'>
          {dataChapter && (
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 my-4'>
                <Link
                  to={`${PATH.comics}/${id}`}
                  title={dataChapter.comic_name}
                  className='flex items-center gap-1 text-lg hover:text-primary'
                >
                  <h2 className='max-w-[220px] line-clamp-1'>{dataChapter.comic_name}</h2>
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
                <span className='text-primary text-lg'>{dataChapter.chapter_name}</span>
              </div>

              <div className='flex items-center gap-2'>
                <button
                  onClick={() => handleChangeEpisode('prev')}
                  className={classNames(
                    'flex items-center justify-center gap-1 px-4 h-9 border rounded-md leading-3',
                    {
                      'hover:border-primary hover:text-primary':
                        Number(idChapter) !==
                        dataChapter.chapters[dataChapter.chapters.length - 1].id,
                      'opacity-80 cursor-default':
                        Number(idChapter) ===
                        dataChapter.chapters[dataChapter.chapters.length - 1].id
                    }
                  )}
                  disabled={
                    Number(idChapter) === dataChapter.chapters[dataChapter.chapters.length - 1].id
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 19.5L8.25 12l7.5-7.5'
                    />
                  </svg>
                </button>
                <button
                  className='px-4 py-[5px] text-black rounded-md relative border'
                  onClick={() => {
                    setOpenList((prev) => !prev)
                    document.getElementById(idChapter as string)?.scrollIntoView()
                  }}
                >
                  <div className='flex items-center gap-2'>
                    <span className='line-clamp-1 max-w-[140px]'>
                      {dataChapter.chapters.find((item) => item.id === Number(idChapter))?.name}
                    </span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </div>
                  <div
                    className={`absolute z-10 top-10 border shadow-lg bg-white w-60 py-3 rounded right-full translate-x-1/3 sm:translate-x-1/2 sm:right-1/2 text-left duration-200 origin-top ${
                      openList ? 'scale-100' : 'scale-[0.001]'
                    }`}
                  >
                    <h5 className='text-lg px-4 pb-1'>
                      All episodes {`(${dataChapter.chapters.length})`}
                    </h5>
                    <ul className='overflow-auto text-sm h-max max-h-72 font-normal'>
                      {dataChapter.chapters.map((item) => (
                        <li id={item.id.toString()} key={item.id}>
                          <Link
                            to={`${PATH.chapters}/${id}/${item.id}`}
                            className={`py-2 block truncate px-4 duration-100 hover:bg-[rgba(0,0,0,0.1)] ${
                              item.id === Number(idChapter) ? 'text-primary font-bold' : ''
                            }`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
                <button
                  onClick={() => handleChangeEpisode('next')}
                  className={classNames(
                    'flex items-center justify-center gap-1 px-4 h-9 border rounded-md leading-3',
                    {
                      'hover:border-primary hover:text-primary':
                        Number(idChapter) !== dataChapter.chapters[0].id,
                      'opacity-80 cursor-default': Number(idChapter) === dataChapter.chapters[0].id
                    }
                  )}
                  disabled={Number(idChapter) === dataChapter.chapters[0].id}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 4.5l7.5 7.5-7.5 7.5'
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='bg-[#111]' onMouseDown={() => setOpenList(false)}>
        <div className='container max-w-4xl'>
          <div className='flex flex-col min-h-screen'>
            {!isFetching &&
              dataChapter &&
              dataChapter.images.map((item) => (
                <img
                  src={item.src}
                  key={item.page}
                  alt={`Page ${item.page.toString()}`}
                  className='w-full'
                />
              ))}
            {isFetching &&
              Array(10)
                .fill(0)
                .map((_, i) => <span key={i} className='aspect-[2/3] bg-zinc-700 animate-pulse' />)}
          </div>
        </div>
      </div>
      <div className='container max-w-4xl min-h-[60px]'>
        {dataChapter && (
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 my-4'>
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
              <Link
                to={`${PATH.comics}/${id}`}
                title={dataChapter.comic_name}
                className='flex items-center gap-1 text-lg hover:text-primary'
              >
                <h2 className='max-w-[220px] line-clamp-1'>{dataChapter.comic_name}</h2>
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
              <span className='text-primary text-lg'>{dataChapter.chapter_name}</span>
            </div>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => handleChangeEpisode('prev')}
                className={classNames(
                  'flex items-center justify-center gap-1 px-4 h-9 border rounded-md leading-3',
                  {
                    'hover:border-primary hover:text-primary':
                      Number(idChapter) !==
                      dataChapter.chapters[dataChapter.chapters.length - 1].id,
                    'opacity-80 cursor-default':
                      Number(idChapter) === dataChapter.chapters[dataChapter.chapters.length - 1].id
                  }
                )}
                disabled={
                  Number(idChapter) === dataChapter.chapters[dataChapter.chapters.length - 1].id
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
                Tập trước
              </button>
              <button
                onClick={() => handleChangeEpisode('next')}
                className={classNames(
                  'flex items-center justify-center gap-1 px-4 h-9 border rounded-md leading-3',
                  {
                    'hover:border-primary hover:text-primary':
                      Number(idChapter) !== dataChapter.chapters[0].id,
                    'opacity-80 cursor-default': Number(idChapter) === dataChapter.chapters[0].id
                  }
                )}
                disabled={Number(idChapter) === dataChapter.chapters[0].id}
              >
                Tập sau
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        {id && <ListComment id={id} />}
      </div>
    </div>
  )
}

export default ComicsChapter
