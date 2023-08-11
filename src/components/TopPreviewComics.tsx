import comicApis from '@/apis/comicApis'
import { comics } from '@/types/data'
import { formatNumberSocial } from '@/utils/formatNumber'
import PATH from '@/utils/path'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

const TopPreviewComics = () => {
  const { data: dataDaily } = useQuery({
    queryKey: ['daily-comics'],
    queryFn: () => comicApis.getTop('/daily'),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataWeekly } = useQuery({
    queryKey: ['weekly-comics'],
    queryFn: () => comicApis.getTop('/weekly'),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataMonthly } = useQuery({
    queryKey: ['monthly-comics'],
    queryFn: () => comicApis.getTop('/monthly'),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataDailyComics = dataDaily?.data.comics
  const dataWeeklyComics = dataWeekly?.data.comics
  const dataMonthlyComics = dataMonthly?.data.comics

  return (
    <div className='grid grid-cols-12 gap-5 justify-items-center justify-center w-full h-[323px]'>
      <div className='col-span-4 w-full'>
        <div className='flex items-end justify-between'>
          <h3 className='capitalize text-xl font-bold leading-5'>Top Ngày</h3>
          <Link
            to={PATH.home}
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
        {dataDailyComics && renderDataTopComics(dataDailyComics.slice(0, 5))}
      </div>
      <div className='col-span-4 w-full'>
        <div className='flex items-end justify-between'>
          <h3 className='capitalize text-xl font-bold leading-5'>Top Tuần</h3>
          <Link
            to={PATH.home}
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
        {dataWeeklyComics && renderDataTopComics(dataWeeklyComics.slice(0, 5))}
      </div>
      <div className='col-span-4 w-full'>
        <div className='flex items-end justify-between'>
          <h3 className='capitalize text-xl font-bold leading-5'>Top Tháng</h3>
          <Link
            to={PATH.home}
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
        {dataMonthlyComics && renderDataTopComics(dataMonthlyComics.slice(0, 5))}
      </div>
    </div>
  )
}
export default TopPreviewComics

const renderDataTopComics = (data: comics[]) => {
  return (
    <ul className='mt-5 flex flex-col gap-[5px]'>
      {data.map((item, index) => (
        <li
          key={item.id}
          className='flex items-center gap-3 border-b border-dashed border-[#ededed]'
        >
          <Link to={PATH.home} className='flex-shrink-0 overflow-hidden'>
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
                to={PATH.home}
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
  )
}
