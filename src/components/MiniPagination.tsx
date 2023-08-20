import { paramOption } from '@/apis/comicApis'
import classNames from 'classnames'
import { createSearchParams, useNavigate } from 'react-router-dom'

interface Props {
  totalPage: number
  page: number
  queryConfig: paramOption
}

const MiniPagination = ({ totalPage, page, queryConfig }: Props) => {
  const navigate = useNavigate()

  const nextPage = () => {
    if (page < totalPage) {
      navigate({
        search: createSearchParams({
          ...queryConfig,
          page: (page + 1).toString()
        }).toString()
      })
    }
  }
  const PrevPage = () => {
    if (page > 1) {
      navigate({
        search: createSearchParams({
          ...queryConfig,
          page: (page - 1).toString()
        }).toString()
      })
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <div className='text-black text-lg'>
        <strong className='text-primary'>{page}</strong>/{totalPage}
      </div>
      <div className='flex items-center gap-1'>
        <button
          onClick={PrevPage}
          className={classNames('py-2 px-3 rounded-md border flex justify-center', {
            'opacity-80 cursor-default text-gray-400': page === 1,
            'hover:border-primary hover:text-primary': page !== 1
          })}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </button>
        <button
          onClick={nextPage}
          className={classNames('py-2 px-3 rounded-md border flex justify-center', {
            'opacity-80 cursor-default text-gray-400': totalPage === page,
            'hover:border-primary hover:text-primary': totalPage !== page
          })}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MiniPagination
