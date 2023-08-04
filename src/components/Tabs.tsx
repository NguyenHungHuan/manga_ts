import comicApis, { pathName } from '@/apis/comicApis'
import PATH from '@/utils/path'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

const Tabs: React.FC = () => {
  const [topState, setTopState] = useState<pathName>('monthly')
  const [open, setOpen] = useState<number>(0)

  const { data } = useQuery({
    queryKey: ['daily-comics', topState],
    queryFn: () => comicApis.getTop(topState),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataTop = data?.data.comics

  return (
    <>
      {dataTop && (
        <>
          <div className='w-full h-[40px] mt-2 mb-4 py-4 px-2 flex justify-between items-center bg-[#f4f4f5] rounded-xl'>
            <button
              onClick={() => setTopState('monthly')}
              className={classNames(
                'rounded-lg px-5 py-1 duration-300 transition-all',
                {
                  'bg-white text-rose-500': topState === 'monthly',
                  'text-gray-500 hover:text-gray-400': topState !== 'monthly'
                }
              )}
            >
              Top Tháng
            </button>
            <button
              onClick={() => setTopState('weekly')}
              className={classNames(
                'rounded-lg px-5 py-1 duration-300 transition-all',
                {
                  'bg-white text-yellow-500': topState === 'weekly',
                  'text-gray-500 hover:text-gray-400': topState !== 'weekly'
                }
              )}
            >
              Top Tuần
            </button>
            <button
              onClick={() => setTopState('daily')}
              className={classNames(
                'rounded-lg px-5 py-1 duration-300 transition-all',
                {
                  'bg-white text-cyan-500': topState === 'daily',
                  'text-gray-500 hover:text-gray-400': topState !== 'daily'
                }
              )}
            >
              Top Ngày
            </button>
          </div>
          <div className='flex flex-col px-2'>
            {dataTop.slice(0, 7).map((item, i) => (
              <Link to={PATH.home} key={item.id} title={item.title} className={`${i !== 0 && 'pt-[11px]'}`}>
                <div className='flex items-center' onMouseEnter={() => setOpen(i)} title={item.title}>
                  <div className='relative group flex items-center gap-3' title={item.title}>
                    {i === open && (
                      <img
                        className='min-w-[89px] h-[67px] rounded-md object-cover object-center'
                        src={item.thumbnail}
                        alt={item.title}
                        title={item.title}
                      />
                    )}
                    <span
                      className={classNames('px-[6px] text-white text-sm rounded', {
                        'absolute top-0 left-0': i === open,
                        'bg-rose-500': i === 0,
                        'bg-yellow-500': i === 1,
                        'bg-cyan-500': i === 2,
                        'bg-gray-400': i > 2
                      })}
                    >
                      {i + 1}
                    </span>
                    <span className='line-clamp-1 mr-4' title={item.title}>
                      {item.title}
                    </span>
                  </div>
                  <div className='ml-auto flex-shrink-0 flex items-center gap-1'>
                    <span className='text-sm'>{item.total_views}</span>
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
                        d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Tabs
