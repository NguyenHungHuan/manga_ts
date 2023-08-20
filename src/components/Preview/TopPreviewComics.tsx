import comicApis from '@/apis/comicApis'
import { comics } from '@/types/data'
import { formatNumberSocial } from '@/utils/formatNumber'
import PATH from '@/utils/path'
import { useQuery } from 'react-query'
import { Link, createSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

const TopPreviewComics = () => {
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
    <div className='grid grid-cols-12 gap-5 justify-items-center justify-center w-full h-[323px]'>
      <div className='col-span-4 w-full'>
        {dataDailyComics &&
          renderDataTopComics(dataDailyComics.slice(0, 5), 'top ngày', `${PATH.top}${PATH.daily}`)}
      </div>
      <div className='col-span-4 w-full'>
        {dataWeeklyComics &&
          renderDataTopComics(
            dataWeeklyComics.slice(0, 5),
            'top tuần',
            `${PATH.top}${PATH.weekly}`
          )}
      </div>
      <div className='col-span-4 w-full'>
        {dataMonthlyComics &&
          renderDataTopComics(
            dataMonthlyComics.slice(0, 5),
            'top tháng',
            `${PATH.top}${PATH.monthly}`
          )}
      </div>
    </div>
  )
}
export default TopPreviewComics

const renderDataTopComics = (data: comics[], title: string, link: string) => {
  return (
    <>
      <div className='flex items-end justify-between'>
        <h3 className='capitalize text-xl font-bold leading-5'>{title}</h3>
        <Link
          to={{
            pathname: link,
            search: createSearchParams({
              status: 'all',
              page: '1'
            }).toString()
          }}
          className='flex items-center gap-1 text-sm text-gray-500 hover:text-primary'
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
      <ul className='mt-5 flex flex-col gap-[5px]'>
        {data.map((item, index) => (
          <li
            key={item.id}
            className='flex items-center gap-3 border-b border-dashed border-[#ededed]'
          >
            <Link
              to={`${PATH.comics}/${item.id}`}
              title={item.title}
              className='flex-shrink-0 overflow-hidden'
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                title={item.title}
                className='object-cover object-center w-20 h-[50px]'
              />
            </Link>
            <div className='flex items-start gap-3'>
              <span
                className={`flex-shrink-0 text-center rounded-full w-[22px] h-[22px] -mt-[2px] 
                     ${index === 0 && ' bg-[#feda00] text-white'} 
                     ${index === 1 && ' bg-[#feaf00] text-white'} 
                     ${index === 2 && ' bg-[#fe8f00] text-white'} 
                     ${index > 2 && ' text-black/70 bg-[#eeecec]'}`}
              >
                {index + 1}
              </span>
              <div className='-mt-[2px]'>
                <Link
                  title={item.title}
                  to={`${PATH.comics}/${item.id}`}
                  className='hover:text-primary font-semibold text-base leading-4 line-clamp-1'
                >
                  {item.title}
                </Link>
                <p className='line-clamp-1 text-gray-400 leading-5 text-sm ml-[1px]'>
                  {formatNumberSocial(item.total_views)} {' lượt xem'}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
