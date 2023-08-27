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
    <>
      <h3 className='flex items-center gap-2 border-b border-slate-200 pb-1 capitalize text-primary text-lg'>
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
      <ul className='flex items-center gap-3 my-5 text-gray-800 font-semibold text-sm flex-wrap'>
        {Array(numberButton)
          .fill(0)
          .map((_, i) => (
            <li key={i}>
              <button
                onClick={() => handleChangeGroupChapter(i)}
                className={classNames(
                  'rounded-md font-normal text-base leading-5 py-[2px] px-2 border border-dashed truncate active:scale-95',
                  {
                    'border-[#d9d9d9] hover:text-primary hover:border-primary ': i !== active,
                    'border-primary text-primary': i === active,
                    hidden: !(i * 50 + 1 <= Math.floor(newestChapter))
                  }
                )}
              >
                {handleRenderGroupChapter(i)}
              </button>
            </li>
          ))}
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
    </>
  )
}

export default ListChapter
