import { paramOption } from '@/apis/comicApis'
import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'

interface Props {
  totalPage: number
  page: number
  queryConfig: paramOption
}
const RANGE = 2
export default function Pagination({ page, totalPage, queryConfig }: Props) {
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className='bg-white dark:bg-gray-900 text-black dark:text-white px-1 pt-2'
          >
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span
            key={index}
            className='bg-white dark:bg-gray-900 text-black dark:text-white px-1 pt-2'
          >
            ...
          </span>
        )
      }
      return null
    }
    return Array(totalPage)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < totalPage - RANGE + 1
        ) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < totalPage - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < totalPage - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (
          page >= totalPage - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'mx-1 cursor-pointer rounded border dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 h-[34px] shadow-sm flex items-center justify-center',
              {
                'border-primary text-primary dark:border-primary dark:text-primary':
                  pageNumber === page,
                'border hover:border-primary hover:text-primary dark:border-gray-500 dark:hover:text-primary dark:hover:border-primary':
                  pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-8 flex flex-wrap justify-center gap-1 gap-y-2'>
      {page === 1 ? (
        <span className='cursor-default rounded border dark:border-gray-500 dark:text-gray-400 text-black dark:bg-gray-900 opacity-60 px-3 h-[34px] shadow-sm flex items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4 opacity-60'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </span>
      ) : (
        <Link
          to={{
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='cursor-pointer rounded border dark:border-gray-500 dark:text-white text-black bg-white dark:bg-gray-900 px-3 h-[34px] shadow-sm flex items-center justify-center hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary'
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
        </Link>
      )}

      {renderPagination()}
      {page === totalPage ? (
        <span className='cursor-default rounded border dark:border-gray-500 opacity-60 px-3 h-[34px] shadow-sm flex items-center justify-center text-black dark:text-gray-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4 opacity-60'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </span>
      ) : (
        <Link
          to={{
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='cursor-pointer rounded border text-black dark:text-gray-300 dark:border-gray-500 bg-white dark:bg-gray-900 px-3 h-[34px] flex items-center justify-center shadow-sm hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary'
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
        </Link>
      )}
    </div>
  )
}
