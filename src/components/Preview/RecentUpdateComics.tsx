import { comics } from '@/types/data'
import PATH from '@/utils/path'
import { useRef } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import imgError from '@/assets/img/img-error.png'
interface Props {
  data: comics[]
}
const RecentUpdateComics = ({ data }: Props) => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <div className='w-full h-[450px]'>
      {data && (
        <div className='mt-4 mx-[-40px]'>
          <div className='flex h-[452px]'>
            <button
              ref={prevRef}
              className='text-gray-400 hover:bg-[#f8f8f9] flex-shrink-0 h-[448px] w-[40px] flex items-center justify-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-8 h-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 19.5L8.25 12l7.5-7.5'
                />
              </svg>
            </button>
            <div className='flex-none w-[1200px] relative'>
              <Swiper
                loop={true}
                slidesPerView={1}
                modules={[Pagination, Navigation]}
                pagination={{ el: '.swiper-pagination-recommend', clickable: true }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current
                }}
              >
                <SwiperSlide>{renderSwiperSlide(data.slice(0, 6))}</SwiperSlide>
                <SwiperSlide>{renderSwiperSlide(data.slice(7, 13))}</SwiperSlide>
                <SwiperSlide>{renderSwiperSlide(data.slice(14, 20))}</SwiperSlide>
                <SwiperSlide>{renderSwiperSlide(data.slice(21, 27))}</SwiperSlide>
              </Swiper>
              <div className='swiper-pagination-recommend inline-block absolute right-1/2 translate-x-1/2 mt-[6px]' />
            </div>
            <button
              ref={nextRef}
              className='text-gray-400 hover:bg-[#f8f8f9] flex-shrink-0 h-[448px] w-[40px] flex items-center justify-center'
            >
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
      )}
    </div>
  )
}
export default RecentUpdateComics

const renderSwiperSlide = (data: comics[]) => {
  return (
    <div className='grid grid-cols-12 gap-2'>
      {data.map((item) => (
        <div key={item.id} className='col-span-4'>
          <div className='flex'>
            <Link to={`${PATH.comics}/${item.id}`} title={item.title} className='flex-shrink-0'>
              <img
                src={item.thumbnail}
                alt={item.title}
                title={item.title}
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
                  className='text-black hover:text-primary text-lg font-bold leading-5 line-clamp-1'
                  title={item.title}
                >
                  {item.title}
                </Link>
                <span className='text-sm text-gray-400'>{item.updated_at}</span>
              </div>
              <div>
                <p className='inline-block'>
                  <span className='mr-1 font-semibold'>Cập nhật:</span>
                  <Link to={PATH.home} className='text-primary'>
                    {item.last_chapter.name}
                  </Link>
                </p>
                <p className='line-clamp-2 mt-2'>{item.short_description}</p>
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
                      <span className='py-[2px] px-1 text-[13px] text-gray-400 border-[#d9d9d9] hover:text-primary hover:border-primary border border-dashed truncate'>
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
