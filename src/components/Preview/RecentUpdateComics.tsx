import { comics } from '@/types/data'
import PATH from '@/utils/path'
import { Link, createSearchParams } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import imgError from '@/assets/img/img-error.png'
import { useEffect, useRef, useState } from 'react'
interface Props {
  data: comics[]
}
const RecentUpdateComics = ({ data }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const el = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (el.current && el) {
      setIsLoading(false)
    }
  }, [el.current, el, data])

  return (
    <div className='w-full h-[450px]'>
      <div className='flex h-[452px] mt-4 mx-[-40px]'>
        <button className='btn-prev-navigate text-gray-400 hover:bg-[#f8f8f9] dark:hover:bg-[rgba(255,255,255,0.08)] flex-shrink-0 h-[448px] w-[40px] flex items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </button>
        <div className='flex-none w-[1200px] relative'>
          {data && (
            <div
              ref={el}
              className={`transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            >
              <Swiper
                loop={true}
                slidesPerView={1}
                modules={[Pagination, Navigation]}
                pagination={{ el: '.swiper-pagination-recommend', clickable: true }}
                navigation={{
                  prevEl: '.btn-prev-navigate',
                  nextEl: '.btn-next-navigate'
                }}
              >
                <SwiperSlide>{renderSwiperSlide(data.slice(0, 6), 3, '2')}</SwiperSlide>
                <SwiperSlide>{renderSwiperSlide(data.slice(7, 13), 3, '2')}</SwiperSlide>
                <SwiperSlide>{renderSwiperSlide(data.slice(14, 20), 3, '2')}</SwiperSlide>
                <SwiperSlide>{renderSwiperSlide(data.slice(21, 27), 3, '2')}</SwiperSlide>
              </Swiper>
              <div className='swiper-pagination-recommend inline-block absolute right-1/2 translate-x-1/2 mt-[6px]' />
            </div>
          )}
          {!data && Skeleton()}
        </div>
        <button className='btn-next-navigate text-gray-400 hover:bg-[#f8f8f9] dark:hover:bg-[rgba(255,255,255,0.08)] flex-shrink-0 h-[448px] w-[40px] flex items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </button>
      </div>
    </div>
  )
}
export default RecentUpdateComics

export const renderSwiperSlide = (data: comics[], perView: number, gap: string) => {
  return (
    <div className={`grid grid-cols-12 gap-${gap}`}>
      {data.map((item) => (
        <div key={item.id} className={`col-span-${(12 / perView).toString()}`}>
          <div className='flex'>
            <Link to={`${PATH.comics}/${item.id}`} title={item.title} className='flex-shrink-0'>
              <img
                src={item.thumbnail}
                alt={item.title}
                title={item.title}
                loading='lazy'
                className='w-[165px] h-[220px] object-cover'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = imgError
                }}
              />
            </Link>
            <div className='pl-[15px] pr-2 leading-5 flex flex-col flex-1 justify-around'>
              <div>
                <Link
                  to={`${PATH.comics}/${item.id}`}
                  className='text-black hover:text-primary dark:text-white dark:hover:text-primary text-lg font-bold leading-5 line-clamp-1'
                  title={item.title}
                >
                  {item.title}
                </Link>
                <span className='text-sm text-gray-400'>{item.updated_at}</span>
              </div>
              <div>
                <p className='inline-block text-black dark:text-white'>
                  <span className='mr-1 font-semibold'>Cập nhật:</span>
                  <Link
                    to={`${PATH.chapters}/${item.id}/${item.last_chapter.id}`}
                    title={item.last_chapter.name}
                    className='text-primary dark:text-primary'
                  >
                    {item.last_chapter.name}
                  </Link>
                </p>
                <p className='line-clamp-2 mt-2 text-black dark:text-white'>{item.short_description}</p>
              </div>
              <div className='flex gap-1 items-center'>
                {item.genres.slice(0, 3).map((genre) => {
                  return genre.id !== undefined ? (
                    <Link
                      title={genre.name}
                      to={{
                        pathname: PATH.genres,
                        search: createSearchParams({
                          type: genre.id,
                          page: '1'
                        }).toString()
                      }}
                      key={genre.id}
                    >
                      <span className='py-[2px] px-1 text-[13px] text-gray-400 dark:text-gray-300 dark:hover:text-primary border-[#d9d9d9] hover:text-primary hover:border-primary border border-dashed truncate'>
                        {genre.name}
                      </span>
                    </Link>
                  ) : null
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const Skeleton = () => {
  return (
    <div className='grid grid-cols-12 gap-2 h-full w-full animate-pulse '>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className='md:flex col-span-4'>
            <div className='flex items-center justify-center w-[165px] h-[220px] bg-gray-300 dark:bg-gray-700 flex-shrink-0'>
              <svg
                className='w-10 h-10 text-gray-200 dark:text-gray-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 18'
              >
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>
            </div>
            <div className='w-full pl-[15px] pr-2 flex flex-col flex-1 justify-around'>
              <div>
                <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4 -mt-2' />
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 -mt-2' />
              </div>
              <div>
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-2.5' />
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-46  mb-2.5' />
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-40  mb-2.5' />
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-14' />
                <div className='h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-14' />
                <div className='h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-14' />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
