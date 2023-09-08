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
import { Helmet } from 'react-helmet-async'

const ComicsChapter = () => {
  const { id, idChapter } = useParams()
  const navigate = useNavigate()
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
        reading_at: new Date().getTime(),
        time: `${new Date().getHours()}:${new Date().getMinutes()} - ${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}`,
        last_reading: dataChapter.chapters.find((item) => item.id === Number(idChapter))
          ?.name as string,
        chapter_id: Number(idChapter)
      })
    }
  }, [id, idChapter, dataComics, dataChapter])

  const handleChangeEpisode = (type: 'prev' | 'next') => {
    if (dataChapter) {
      const episodes = [...dataChapter.chapters].reverse()
      const chapterIdx = episodes.findIndex(
        (chapter: { id: number; name: string }) => chapter.id === Number(idChapter)
      )
      const nextChapterIdx = chapterIdx + (type === 'next' ? 1 : -1)
      if (dataChapter.chapters.map((item) => item.id).includes(Number(idChapter))) {
        navigate(`${PATH.chapters}/${id}/${episodes[nextChapterIdx].id}`)
      }
    }
  }

  useEffect(() => {
    document.getElementById(idChapter as string)?.scrollIntoView({ block: 'center' })
  }, [idChapter])

  useScrollTop([idChapter])

  return (
    <>
      <Helmet>
        <title>{`${dataComics?.title} ${dataComics?.chapters.at(0)?.name} - VTruyen`}</title>
        <meta
          name='description'
          content={`Đọc truyện tranh ${dataComics?.title} ${dataComics?.chapters.at(0)
            ?.name} Tiếng Việt bản dịch Full mới nhất, ảnh đẹp chất lượng cao, cập nhật nhanh và sớm nhất tại VTruyen`}
        />
      </Helmet>
      <div className='min-h-[60px] sticky top-0 left-0 z-20 bg-white dark:bg-gray-900 shadow-lg'>
        <div className='container max-w-4xl'>
          {dataChapter && (
            <div className='flex items-center justify-between px-4 lg:px-0'>
              {Breadcrumb(id as string, idChapter as string, dataChapter)}
              <div className='flex flex-1 sm:flex-none items-center justify-between gap-4 sm:gap-2 my-4'>
                <div className='flex items-center gap-2'>
                  <button
                    title='Tập trước'
                    onClick={() => handleChangeEpisode('prev')}
                    className={classNames(
                      'flex items-center justify-center gap-1 px-3 h-8 border dark:border-gray-500 rounded-md leading-3 active:scale-95',
                      {
                        'hover:border-primary hover:text-primary dark:text-white dark:hover:border-primary dark:hover:text-primary':
                          Number(idChapter) !==
                          dataChapter.chapters[dataChapter.chapters.length - 1].id,
                        'opacity-60 cursor-default dark:text-white/60':
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
                    className='px-3 py-[3px] text-black dark:text-white rounded-md relative border dark:border-gray-500'
                    onClick={() => setOpenList((prev) => !prev)}
                  >
                    <div className='flex items-center gap-2'>
                      <span className='line-clamp-1 max-w-[120px]'>
                        {dataChapter.chapters.find((item) => item.id === Number(idChapter))?.name
                          ? dataChapter.chapters.find((item) => item.id === Number(idChapter))?.name
                          : dataChapter.chapters[0].name}
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
                      className={`absolute z-10 top-10 border dark:border-gray-500 shadow-lg bg-white dark:bg-gray-900 w-60 py-3 rounded translate-x-1/2 right-1/2 text-left duration-200 origin-top ${
                        openList
                          ? 'scale-100 pointer-events-auto'
                          : 'scale-[0.001] pointer-events-none'
                      }`}
                    >
                      <h5 className='text-lg px-4 pb-2 leading-5'>
                        All episodes {`(${dataChapter.chapters.length})`}
                      </h5>
                      <ul className='overflow-auto text-sm h-max max-h-64 font-normal'>
                        {dataChapter.chapters.map((item) => (
                          <li key={item.id}>
                            <Link
                              title={item.name}
                              id={item.id.toString()}
                              to={`${PATH.chapters}/${id}/${item.id}`}
                              className={`py-2 block truncate px-4 duration-100 hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)] ${
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
                    title='Tập sau'
                    onClick={() => handleChangeEpisode('next')}
                    className={classNames(
                      'flex items-center justify-center gap-1 px-3 h-8 border dark:border-gray-500 rounded-md leading-3 active:scale-95',
                      {
                        'hover:border-primary hover:text-primary dark:text-white dark:hover:border-primary dark:hover:text-primary':
                          Number(idChapter) !== dataChapter.chapters[0].id,
                        'opacity-60 cursor-default dark:text-white/60':
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
          <div className='flex flex-col min-h-screen h-full'>
            {!isFetching &&
              dataChapter &&
              dataChapter.images.length > 0 &&
              dataChapter.images.map((item, index) =>
                index >= 4 ? (
                  <img
                    src={item.src}
                    loading='lazy'
                    key={item.page}
                    alt={`Page ${item.page.toString()}`}
                    className='min-h-[35px] h-auto max-w-full w-auto relative text-white'
                  />
                ) : (
                  <img
                    src={item.src}
                    key={item.page}
                    alt={`Page ${item.page.toString()}`}
                    className='min-h-[35px] h-auto max-w-full w-auto relative text-white'
                    loading='eager'
                  />
                )
              )}
            {!isFetching && dataChapter && dataChapter.images.length <= 0 && (
              <h2 className='text-3xl text-white flex-1 flex items-center justify-center'>
                Không tìm thấy chương
              </h2>
            )}
            {isFetching &&
              Array(10)
                .fill(0)
                .map((_, i) => <span key={i} className='aspect-[2/3] bg-zinc-700 animate-pulse' />)}
          </div>
        </div>
      </div>
      <div className='container max-w-4xl min-h-[60px]'>
        {dataChapter && (
          <div className='flex items-center justify-between px-4 lg:px-0'>
            {Breadcrumb(id as string, idChapter as string, dataChapter)}
            <div className='flex flex-1 sm:flex-none items-center justify-between gap-3 my-4'>
              <div className='flex items-center flex-wrap gap-3 text-black dark:text-white'>
                <button
                  title='Tập sau'
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
                  title='Tập sau'
                  onClick={() => handleChangeEpisode('next')}
                  className={classNames(
                    'flex items-center justify-center gap-1 min-w-[125px] px-4 h-9 border rounded-md leading-3 active:scale-95',
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

const Breadcrumb = (id: string, idChapter: string, dataChapter: comicSingleChapter) => {
  return (
    <div className='hidden sm:flex items-center gap-1 my-4 dark:text-white'>
      <Link
        title='Trang chủ'
        to={PATH.home}
        className='hidden lg:flex items-center hover:text-primary text-lg'
      >
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
        className='hidden md:flex items-center text-lg hover:text-primary'
      >
        <h2 className='max-w-[200px] line-clamp-1'>
          {dataChapter.comic_name ? dataChapter.comic_name : id.split('-').join(' ')}
        </h2>
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
      <h3
        onClick={() =>
          window.scroll({
            top: 0,
            behavior: 'smooth'
          })
        }
        title={dataChapter.chapters.find((item) => item.id === Number(idChapter))?.name}
        className='text-primary text-lg max-w-[150px] line-clamp-1 cursor-pointer'
      >
        {dataChapter.chapters.find((item) => item.id === Number(idChapter))?.name}
      </h3>
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
      title='download'
      onClick={handleClick}
      className='pl-4 sm:pl-2 border-l border-gray-400/60 text-gray-500 dark:text-gray-300 dark:border-gray-500 font-medium flex items-center justify-center gap-1 h-6 hover:text-primary text-lg'
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
      <span className='hidden sm:inline-block'>Download</span>
    </button>
  )
}
