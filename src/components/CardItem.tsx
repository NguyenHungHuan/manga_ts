import { comics } from '@/types/data'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  comics: comics & { last_reading?: string; chapter_id?: number }
  detail?: boolean
  isHistory?: boolean
}

const CardItem: React.FC<Props> = ({ comics, detail, isHistory }) => {
  const navigate = useNavigate()
  const {
    authors,
    followers,
    id,
    status,
    thumbnail,
    title,
    total_comments,
    total_views,
    is_trending,
    updated_at,
    chapter_id,
    last_reading
  } = comics

  const handleClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: 'detail' | 'delete' | 'continue'
  ) => {
    e.stopPropagation()
    if (type === 'delete') {
      // historyDeleteComic(id)
      // emit('delete-comic', id)
      return
    }
    if (type === 'continue') {
      navigate(`/comic/${id}/${chapter_id}`)
      return
    }
    navigate(`/comic/${id}`)
  }

  return (
    <div
      className='overflow-hidden flex-shrink-0 rounded-md duration-500 relative group md:group-hover:shadow-md cursor-pointer'
      onClick={(e) => handleClickCard(e, 'detail')}
    >
      <div className='flex gap-1 absolute font-semibold top-1 inset-x-1 z-10 text-xs text-white'>
        <span className='bg-rose-500 py-0.5 px-2 rounded-md'>Hot</span>
        <span className='bg-amber-500 py-0.5 px-2 rounded-md'>Up</span>
        <span className='bg-sky-500 py-0.5 px-2 rounded-md'>End</span>
      </div>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center justify-center text-white bg-gray-200 duration-150'>
          {/* <Icon className="line-md:loading-loop" size="48" /> */}
        </div>
        <img
          src={thumbnail}
          alt={title}
          title={title}
          className='w-full h-[275px] aspect-[2/3] object-cover scale-[1.01] group-hover:scale-105 duration-300 origin-bottom select-none'
        />
      </div>
      <div className='absolute top-1/2 bottom-0 inset-x-0 flex flex-col justify-end px-2 sm:px-4 py-2 bg-gradient-to-b from-transparent to-black'>
        <h5 className='font-bold leading-5 text-lg text-white text-shadow duration-200 line-clamp-2'>
          <span title={title} className='no-underline'>
            {title}
          </span>
        </h5>
        <hr className='mt-3 mb-0.5 border-gray-500' />
        <div>
          <p className='text-sm text-gray-300 truncate font-semibold'>
            {Array.isArray(authors) && <span>{authors.join(' | ')}</span>}
            {authors === 'Updating' && (
              <span className='flex items-center gap-1'>
                {/* <Icon
                  name="mdi:dots-circle"
                  size="16"
                  className="text-emerald-500"
                /> */}
                Updating
              </span>
            )}
            {!Array.isArray(authors) && <span>{authors}</span>}
          </p>
          <div
            className='hidden md:flex items-center gap-0.5 justify-center gap-x-2 gap-y-1 text-emerald-400 text-xs py-1 mt-0.5'
            v-if='!isHistory'
          >
            <span className='flex items-center gap-1 bg-white/25 px-1 rounded'>
              {/* <Icon name="carbon:view-filled" /> */}
              {total_views}
            </span>
            <span className='flex items-center gap-1 bg-white/25 px-1 rounded'>
              {/* <Icon name="ant-design:heart-outlined" /> */}
              {followers}
            </span>
            <span className='flex items-center gap-1 bg-white/25 px-1 rounded'>
              {/* <Icon name="mingcute:comment-fill" /> */}
              {total_comments}
            </span>
          </div>
          <div className='text-gray-300'>
            <p className='text-sm font-semibold flex items-center gap-0.5 mb-1 text-fuchsia-400'>
              {/* <Icon name="ph:read-cv-logo-fill" size="18" /> */}
              {last_reading}
            </p>
            <div className='flex items-center gap-1 text-sm text-white'>
              <button
                className='bg-sky-500 w-full px-2 py-1 rounded-sm flex justify-center items-center gap-1'
                onClick={(e) => handleClickCard(e, 'continue')}
              >
                {/* <Icon name="system-uicons:book-text" size="20" /> */}
                Continue
              </button>
              <button
                className='bg-rose-500 px-2 py-1 rounded-sm'
                onClick={(e) => handleClickCard(e, 'delete')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <span className='py-1' />
      </div>
    </div>
  )
}

export default CardItem

// .group:hover .text-shadow {
//   text-shadow: 0 0 6px #10b981;
// }
