import { comicsChapter } from '@/types/data'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import PATH from '@/utils/path'

interface Props {
  data: comicsChapter
  id: string
}

const ListChapter = ({ data, id }: Props) => {
  const newestChapter = useMemo(() => Number(data[0]?.name.match(/\d+(\.\d+)?/)?.[0]), [data])
  const numberButton = useMemo(() => Math.ceil(newestChapter / 50), [newestChapter])
  const [dataChapter, setDataChapter] = useState<any>([])
  const [range, setRange] = useState([0, 50])
  const [active, setActive] = useState<number>(0)
  const [openList, setOpenList] = useState<boolean>(false)

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

  return (
    <div onClick={() => setOpenList(false)}>
      <ul className='flex items-center gap-3 my-5 text-gray-800 font-semibold text-sm flex-wrap'>
        <li>
          <button
            className='text-black rounded-md relative font-normal text-base leading-5 py-1 px-3 border flex items-center gap-2'
            onClick={(e) => {
              e.stopPropagation()
              setOpenList((prev) => !prev)
            }}
          >
            <div className='flex items-center gap-2'>
              <span className='line-clamp-1 max-w-[140px]'>{`${range[0]} - ${
                data.length > 50 ? range[1] : data[0].name.match(/\d+(\.\d+)?/)?.[0]
              }`}</span>
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
              className={`absolute z-10 top-8 border shadow-lg bg-white w-32 px-1 rounded right-full translate-x-1/3 sm:translate-x-1/2 sm:right-1/2 text-left duration-200 origin-top ${
                openList ? 'scale-100' : 'scale-[0.001]'
              }`}
            >
              <ul className='overflow-auto text-sm h-max max-h-72 font-normal px-2'>
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
                          'border-t border-dashed': i !== 0,
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
      <div className='grid grid-cols-4 gap-5 my-5 text-gray-800 font-semibold text-sm flex-wrap'>
        {(dataChapter as comicsChapter).map((item) => (
          <Link
            to={`${PATH.chapters}/${id}/${item.id}`}
            title={item.name}
            key={item.id}
            className='rounded-sm font-normal text-base h-[38px] pt-2 px-4 bg-[#f6f6f6] hover:bg-primary/10 hover:text-primary truncate'
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ListChapter
