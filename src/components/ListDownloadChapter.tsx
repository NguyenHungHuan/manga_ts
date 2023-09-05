import { comicsChapter } from '@/types/data'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import PATH from '@/utils/path'

interface Props {
  data: comicsChapter
  id: string
}

const ListDownloadChapter = ({ data, id }: Props) => {
  const newestChapter = useMemo(() => Number(data[0]?.name.match(/\d+(\.\d+)?/)?.[0]), [data])
  const numberButton = useMemo(() => Math.ceil(newestChapter / 50), [newestChapter])
  const [dataChapter, setDataChapter] = useState<any>([])
  const [range, setRange] = useState([0, 50])
  const [active, setActive] = useState<number>(0)
  const [openList, setOpenList] = useState<boolean>(false)
  const [downloadChapters, setDownloadChapters] = useState<number[]>([])

  useEffect(() => {
    setDataChapter(
      data
        .filter(
          (item) =>
            Number(item.name.match(/\d+(\.\d+)?/)?.[0]) <=
              (!isNaN(range[1]) && range[1] < newestChapter ? range[1] : newestChapter) &&
            Number(item.name.match(/\d+(\.\d+)?/)?.[0]) >= (!isNaN(range[0]) ? range[0] : 0)
        )
        .reverse()
    )
  }, [range])

  const handleRenderGroupChapter = (i: number) => {
    if (i === 0) {
      return `${i} - ${(i + 1) * 50 > newestChapter ? newestChapter : (i + 1) * 50}`
    } else {
      return `${i * 50 + 1} - ${
        (i + 1) * 50 >= Math.floor(newestChapter) ? newestChapter : (i + 1) * 50
      }`
    }
  }

  const handleChangeGroupChapter = (i: number) => {
    setActive(i)
    if (i === 0) {
      setRange([i, (i + 1) * 50 > newestChapter ? newestChapter : (i + 1) * 50])
    } else {
      setRange([
        i * 50 + 1,
        (i + 1) * 50 >= Math.floor(newestChapter) ? newestChapter : (i + 1) * 50
      ])
    }
  }

  const onAddDownloadChapter = (chapterId: number) => {
    if (downloadChapters.includes(chapterId)) {
      setDownloadChapters((prev) => prev.filter((item) => item !== chapterId))
    } else {
      setDownloadChapters((prev) => [...prev, chapterId])
    }
  }

  const handleDownloadChapters = async () => {
    try {
      for (const chapterId of downloadChapters) {
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
      setDownloadChapters([])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className='flex items-center gap-3 border-b border-slate-200 dark:border-gray-500 py-4'>
        <h3 className='flex items-center gap-2 capitalize text-primary text-lg'>
          Danh sách chương
        </h3>
        <ul className='flex items-center gap-3 text-gray-800 font-semibold text-sm flex-wrap'>
          <li>
            <button
              className='text-black dark:text-white rounded-md relative font-normal text-base leading-5 py-1 px-2 border dark:border-gray-500 flex items-center gap-2'
              onClick={() => setOpenList((prev) => !prev)}
            >
              <div className='flex items-center gap-2'>
                <span className='line-clamp-1 max-w-[140px]'>{`${range[0]} - ${range[1]}`}</span>
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
                className={`absolute z-10 top-8 border dark:border-gray-500 shadow-lg bg-white dark:bg-gray-900 w-32 rounded translate-x-1/2 right-1/2 text-left duration-200 origin-top ${
                  openList ? 'scale-100 pointer-events-auto' : 'scale-[0.001] pointer-events-none'
                }`}
              >
                <ul className='overflow-auto text-sm h-max max-h-72 font-normal px-1 pl-3'>
                  {Array(numberButton)
                    .fill(0)
                    .map((_, i) => (
                      <li
                        key={i}
                        onClick={() => handleChangeGroupChapter(i)}
                        className={classNames(
                          'font-normal text-base leading-5 flex justify-start w-full truncate py-2',
                          {
                            'hover:text-primary': i !== active,
                            'text-primary': i === active,
                            'border-t border-dashed dark:border-gray-500': i !== 0,
                            hidden: !(i * 50 + 1 <= Math.floor(newestChapter))
                          }
                        )}
                      >
                        {handleRenderGroupChapter(i)}
                      </li>
                    ))}
                </ul>
              </div>
            </button>
          </li>
        </ul>
      </div>
      <div className='px-2 overflow-y-auto h-[350px]'>
        <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-3 text-gray-800 font-semibold text-sm flex-wrap'>
          {(dataChapter as comicsChapter).map((item) => (
            <li key={item.id} className='flex-1 rounded-md overflow-hidden'>
              <button
                onClick={() => onAddDownloadChapter(item.id)}
                title={item.name}
                className={classNames(
                  'h-[38px] w-full px-3 font-normal rounded-md dark:text-white text-base overflow-hidden active:scale-95',
                  {
                    'text-primary bg-primary/10 dark:text-primary dark:bg-primary/50':
                      downloadChapters.includes(item.id),
                    'bg-[#f6f6f6] dark:bg-gray-700': !downloadChapters.includes(item.id)
                  }
                )}
              >
                <span className='line-clamp-1 whitespace-nowrap'>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex items-center gap-3 justify-end pr-4 pt-2'>
        <span className='text-primary'>{`( ${downloadChapters.length} )`}</span>
        <button
          onClick={handleDownloadChapters}
          className='py-2 px-4 bg-gradient text-white rounded-md'
        >
          Download
        </button>
      </div>
    </>
  )
}
export default ListDownloadChapter
