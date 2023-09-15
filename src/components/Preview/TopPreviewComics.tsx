import comicApis from '@/apis/comicApis'
import { comics } from '@/types/data'
import PATH from '@/utils/path'
import { useQuery } from 'react-query'
import { Link, createSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import imgError from '/img-error.webp'
import iconTop from '/icon-top.webp'
import { useMediaQuery } from 'react-responsive'

const TopPreviewComics = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const { data: dataDaily } = useQuery({
    queryKey: [`${PATH.top}${PATH.daily}`, { page: '1', status: 'all' }],
    queryFn: () =>
      comicApis.getComicsByUrl(`${PATH.top}${PATH.daily}`, { page: '1', status: 'all' }),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataWeekly } = useQuery({
    queryKey: [`${PATH.top}${PATH.weekly}`, { page: '1', status: 'all' }],
    queryFn: () =>
      comicApis.getComicsByUrl(`${PATH.top}${PATH.weekly}`, { page: '1', status: 'all' }),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataMonthly } = useQuery({
    queryKey: [`${PATH.top}${PATH.monthly}`, { page: '1', status: 'all' }],
    queryFn: () =>
      comicApis.getComicsByUrl(`${PATH.top}${PATH.monthly}`, { page: '1', status: 'all' }),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataDailyComics = useMemo(() => dataDaily?.data.comics, [dataDaily])
  const dataWeeklyComics = useMemo(() => dataWeekly?.data.comics, [dataWeekly])
  const dataMonthlyComics = useMemo(() => dataMonthly?.data.comics, [dataMonthly])
  
  return (
    <>
      <div className='flex sm:hidden items-end'>
        <div className='flex items-center gap-2'>
          <img src={iconTop} alt='icon' className='w-auto h-[28px]'/>
          <h2 className='capitalize text-2xl font-bold leading-5 text-black dark:text-white'>
            BXH
          </h2>
        </div>
        <Link
          to={{
            pathname: PATH.top,
            search: createSearchParams({
              status: 'all',
              page: '1'
            }).toString()
          }}
          className='flex flex-1 items-center justify-end gap-1 text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary'
        >
          <span>Tất cả</span>
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
      </div>
      <div className='grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-3 lg:gap-5 justify-items-center justify-center w-full min-h-[323px]'>
        <div className='col-span-4 w-full'>
          <div className='hidden sm:flex items-end'>
            <h3 className='capitalize text-xl font-bold leading-5 text-black dark:text-white'>
              top ngày
            </h3>
            <Link
              title='Top ngày'
              to={{
                pathname: `${PATH.top}${PATH.daily}`,
                search: createSearchParams({
                  status: 'all',
                  page: '1'
                }).toString()
              }}
              className='flex flex-1 justify-end items-center gap-1 text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary'
            >
              <span>Tất cả</span>
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
          </div>
          {dataDailyComics &&
            (isMobile
              ? renderDataTopComics(dataDailyComics.slice(0, 8))
              : renderDataTopComics(dataDailyComics.slice(0, 5)))}
          {!dataDailyComics && (isMobile ? skeleton(8) : skeleton(5))}
        </div>
        <div className='hidden sm:block col-span-4 w-full'>
          <div className='hidden sm:flex items-end'>
            <h3 className='capitalize text-xl font-bold leading-5 text-black dark:text-white'>
              top tuần
            </h3>
            <Link
              title='Top tuần'
              to={{
                pathname: `${PATH.top}${PATH.weekly}`,
                search: createSearchParams({
                  status: 'all',
                  page: '1'
                }).toString()
              }}
              className='flex flex-1 justify-end items-center gap-1 text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary'
            >
              <span>Tất cả</span>
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
          </div>
          {dataWeeklyComics && renderDataTopComics(dataWeeklyComics.slice(0, 5))}
          {!dataWeeklyComics && skeleton(5)}
        </div>
        <div className='hidden md:block col-span-4 w-full'>
          <div className='hidden md:flex items-end'>
            <h3 className='capitalize text-xl font-bold leading-5 text-black dark:text-white'>
              top tháng
            </h3>
            <Link
              title='Top tháng'
              to={{
                pathname: `${PATH.top}${PATH.monthly}`,
                search: createSearchParams({
                  status: 'all',
                  page: '1'
                }).toString()
              }}
              className='flex flex-1 justify-end items-center gap-1 text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary'
            >
              <span>Tất cả</span>
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
          </div>
          {dataMonthlyComics && renderDataTopComics(dataMonthlyComics.slice(0, 5))}
          {!dataMonthlyComics && skeleton(5)}
        </div>
      </div>
    </>
  )
}
export default TopPreviewComics

const renderDataTopComics = (data: comics[]) => {
  return (
    <ul className='mt-5 flex flex-col gap-[5px]'>
      {data.map((item, index) => (
        <li
          key={item.id}
          className='flex items-center gap-3 border-b border-dashed border-[#ededed] dark:border-gray-600'
        >
          <Link
            to={`${PATH.comics}/${item.id}`}
            title={item.title}
            className='flex-shrink-0 overflow-hidden'
          >
            <img
              loading='lazy'
              src={item.thumbnail}
              alt={item.title}
              title={item.title}
              className='object-cover object-center w-20 h-[50px]'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = imgError
              }}
            />
          </Link>
          <div className='flex items-start gap-3'>
            <span
              className={`flex-shrink-0 text-center rounded-full w-[22px] h-[22px] -mt-[2px] 
                     ${index === 0 && ' bg-[#feda00] text-white'} 
                     ${index === 1 && ' bg-[#feaf00] text-white'} 
                     ${index === 2 && ' bg-[#fe8f00] text-white'} 
                     ${
                       index > 2 &&
                       ' text-black/70 bg-[#eeecec] dark:text-white/70 dark:bg-gray-600'
                     }`}
            >
              {index + 1}
            </span>
            <div className='-mt-[2px]'>
              <Link
                title={item.title}
                to={`${PATH.comics}/${item.id}`}
                className='hover:text-primary text-black dark:text-white dark:hover:text-primary font-semibold text-base leading-4 line-clamp-1'
              >
                {item.title}
              </Link>
              <p className='line-clamp-1 text-gray-400 leading-5 text-sm ml-[1px]'>
                {item.total_views} {' lượt xem'}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

const skeleton = (number: number) => {
  return (
    <ul className='mt-5 flex flex-col gap-[5px] animate-pulse'>
      {Array(number)
        .fill(0)
        .map((_, i) => (
          <li key={i} className='flex items-center gap-3'>
            <div className='flex items-center justify-center w-20 h-[50px] bg-gray-300 dark:bg-gray-700 flex-shrink-0 overflow-hidden'>
              <svg
                className='w-8 h-8 text-gray-200 dark:text-gray-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 18'
              >
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>
            </div>
            <div className='flex items-start gap-2'>
              <span className='w-[22px] h-[22px] -mt-[2px] bg-gray-200 rounded-full dark:bg-gray-700' />
              <div className='mt-[2px]'>
                <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-40 md:w-32 lg:w-48 mb-4 -mt-2' />
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-28 md:w-24 lg:w-36 -mt-2' />
              </div>
            </div>
          </li>
        ))}
    </ul>
  )
}
