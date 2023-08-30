import comicApis from '@/apis/comicApis'
import { ListComment } from '@/components'
import { useScrollTop } from '@/hooks'
import PATH from '@/utils/path'
import classNames from 'classnames'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { comicSingleChapter } from '@/types/data'
import { historyAddComic } from '@/utils/history'

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

  const { data: dataComic } = useQuery({
    queryKey: ['comic_detail', id],
    queryFn: () => comicApis.getComicDetail(id as string),
    staleTime: 3 * 60 * 1000,
    enabled: id !== ''
  })
  const dataComics = dataComic?.data
  const dataChapter = data?.data

  useEffect(() => {
    if (dataComics && dataChapter) {
      historyAddComic({
        id: dataComics.id,
        status: dataComics.status,
        title: dataComics.title,
        thumbnail: dataComics.thumbnail,
        description: dataComics.description,
        reading_at: `${new Date().getHours()}:${new Date().getMinutes()} - ${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        last_reading: dataChapter.chapter_name,
        chapter_id: Number(idChapter)
      })
    }
  }, [dataComics, dataChapter])

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
    <>
      <div className='min-h-[60px] sticky top-0 z-20 bg-white shadow-lg'>
        <div className='container max-w-4xl'>
          {dataChapter && (
            <div className='flex items-center justify-between'>
              {Breadcrumb(id as string, dataChapter)}
              <div className='flex items-center gap-8'>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => handleChangeEpisode('prev')}
                    className={classNames(
                      'flex items-center justify-center gap-1 px-4 h-9 border rounded-md leading-3 active:scale-95',
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
                      'flex items-center justify-center gap-1 px-4 h-9 border rounded-md leading-3 active:scale-95',
                      {
                        'hover:border-primary hover:text-primary':
                          Number(idChapter) !== dataChapter.chapters[0].id,
                        'opacity-80 cursor-default':
                          Number(idChapter) === dataChapter.chapters[0].id
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
                {ButtonDownload(id as string, idChapter as string)}
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
                  loading='lazy'
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
            {Breadcrumb(id as string, dataChapter)}
            <div className='flex items-center gap-8'>
              <div className='flex items-center gap-4'>
                <button
                  onClick={() => handleChangeEpisode('prev')}
                  className={classNames(
                    'flex items-center justify-center gap-1 px-4 h-9 border rounded-md leading-3 active:scale-95',
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
                  Tập trước
                </button>
                <button
                  onClick={() => handleChangeEpisode('next')}
                  className={classNames(
                    'flex items-center justify-center gap-1 px-4 h-9 border rounded-md leading-3 active:scale-95',
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
              {ButtonDownload(id as string, idChapter as string)}
            </div>
          </div>
        )}
        {id && <ListComment id={id} />}
      </div>
    </>
  )
}
export default ComicsChapter

const Breadcrumb = (id: string, dataChapter: comicSingleChapter) => {
  return (
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
  )
}

const ButtonDownload = (id: string, chapterId: string) => {
  const handleClick = () => {
    const href = `${PATH.download}/${id}/${chapterId}`
    const a = document.createElement('a')
    a.href = href
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(href)
  }

  return (
    <button
      onClick={handleClick}
      className='pl-8 border-l border-gray-400/60 text-gray-500 font-medium flex items-center justify-center gap-2 h-6 hover:text-primary text-lg'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        aria-hidden='true'
        className='w-5 h-5'
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
      Download
    </button>
  )
}
