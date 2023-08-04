import iconrecentUpdate from '@/assets/img/icon-recentUpdate.png'
import { comics } from '@/types/data'
import PATH from '@/utils/path'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRef } from 'react'

interface Props {
  data: comics[]
}

const RecentUpdateSlide = ({ data }: Props) => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <div className='flex items-end justify-between'>
        <div className='flex items-center gap-4'>
          <img src={iconrecentUpdate} alt='Icon Recommend' className='w-[32px] h-[32px]' />
          <h2 className='capitalize text-[25px] text-black leading-6'>Mới Cập Nhật</h2>
        </div>
        <Link
          to={PATH.home}
          className='flex items-center gap-1 text-sm text-black hover:text-primary'
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
                  <SwiperSlide>
                    <div className='grid grid-cols-12 gap-2'>
                      {data.slice(0, 6).map((item) => (
                        <div key={item.id} className='col-span-4'>
                          <div className='flex'>
                            <Link to={PATH.home} className='flex-shrink-0'>
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                title={item.title}
                                className='w-[165px] h-[220px] object-cover'
                              />
                            </Link>
                            <div className='pl-[15px] pr-2 leading-5 flex flex-col flex-1 justify-around'>
                              <div>
                                <Link
                                  to={PATH.home}
                                  className='text-black hover:text-primary text-lg font-bold leading-5 line-clamp-1'
                                  title={item.title}
                                >
                                  {item.title}
                                </Link>
                                <span className='text-sm text-gray-400'>{item.updated_at}</span>
                              </div>
                              <div>
                                <p className='inline-block'>
                                  <span className='mr-1'>Cập nhật:</span>
                                  <Link to={PATH.home} className='text-primary'>
                                    {item.lastest_chapters[0].name}
                                  </Link>
                                </p>
                                <p className='line-clamp-2 mt-2'>{item.short_description}</p>
                              </div>
                              <div className='flex gap-1 items-center'>
                                {item.genres.slice(0, 3).map((genre) => {
                                  return genre.id !== undefined ? (
                                    <div key={genre.id}>
                                      <span className='py-[2px] px-1 text-[13px] text-gray-400 border border-dashed border-[#d9d9d9] line-clamp-1'>
                                        {genre.name}
                                      </span>
                                    </div>
                                  ) : null
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='grid grid-cols-12 gap-2'>
                      {data.slice(7, 13).map((item) => (
                        <div key={item.id} className='col-span-4'>
                          <div className='flex'>
                            <Link to={PATH.home} className='flex-shrink-0'>
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                title={item.title}
                                className='w-[165px] h-[220px] object-cover'
                              />
                            </Link>
                            <div className='pl-[15px] pr-2 leading-5 flex flex-col flex-1 justify-around'>
                              <div>
                                <Link
                                  to={PATH.home}
                                  className='text-black hover:text-primary text-lg font-bold leading-5 line-clamp-1'
                                  title={item.title}
                                >
                                  {item.title}
                                </Link>
                                <span className='text-sm text-gray-400'>{item.updated_at}</span>
                              </div>
                              <div>
                                <p className='inline-block'>
                                  <span className='mr-1'>Cập nhật:</span>
                                  <Link to={PATH.home} className='text-primary'>
                                    {item.lastest_chapters[0].name}
                                  </Link>
                                </p>
                                <p className='line-clamp-2 mt-2'>{item.short_description}</p>
                              </div>
                              <div className='flex gap-1 items-center'>
                                {item.genres.slice(0, 3).map((genre) => {
                                  return genre.id !== undefined ? (
                                    <div key={genre.id}>
                                      <span className='py-[2px] px-1 text-[13px] text-gray-400 border border-dashed border-[#d9d9d9] line-clamp-1'>
                                        {genre.name}
                                      </span>
                                    </div>
                                  ) : null
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='grid grid-cols-12 gap-2'>
                      {data.slice(14, 20).map((item) => (
                        <div key={item.id} className='col-span-4'>
                          <div className='flex'>
                            <Link to={PATH.home} className='flex-shrink-0'>
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                title={item.title}
                                className='w-[165px] h-[220px] object-cover'
                              />
                            </Link>
                            <div className='pl-[15px] pr-2 leading-5 flex flex-col flex-1 justify-around'>
                              <div>
                                <Link
                                  to={PATH.home}
                                  className='text-black hover:text-primary text-lg font-bold leading-5 line-clamp-1'
                                  title={item.title}
                                >
                                  {item.title}
                                </Link>
                                <span className='text-sm text-gray-400'>{item.updated_at}</span>
                              </div>
                              <div>
                                <p className='inline-block'>
                                  <span className='mr-1'>Cập nhật:</span>
                                  <Link to={PATH.home} className='text-primary'>
                                    {item.lastest_chapters[0].name}
                                  </Link>
                                </p>
                                <p className='line-clamp-2 mt-2'>{item.short_description}</p>
                              </div>
                              <div className='flex gap-1 items-center'>
                                {item.genres.slice(0, 3).map((genre) => {
                                  return genre.id !== undefined ? (
                                    <div key={genre.id}>
                                      <span className='py-[2px] px-1 text-[13px] text-gray-400 border border-dashed border-[#d9d9d9] line-clamp-1'>
                                        {genre.name}
                                      </span>
                                    </div>
                                  ) : null
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='grid grid-cols-12 gap-2'>
                      {data.slice(21, 27).map((item) => (
                        <div key={item.id} className='col-span-4'>
                          <div className='flex'>
                            <Link to={PATH.home} className='flex-shrink-0'>
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                title={item.title}
                                className='w-[165px] h-[220px] object-cover'
                              />
                            </Link>
                            <div className='pl-[15px] pr-2 leading-5 flex flex-col flex-1 justify-around'>
                              <div>
                                <Link
                                  to={PATH.home}
                                  className='text-black hover:text-primary text-lg font-bold leading-5 line-clamp-1'
                                  title={item.title}
                                >
                                  {item.title}
                                </Link>
                                <span className='text-sm text-gray-400'>{item.updated_at}</span>
                              </div>
                              <div>
                                <p className='inline-block'>
                                  <span className='mr-1'>Cập nhật:</span>
                                  <Link to={PATH.home} className='text-primary'>
                                    {item.lastest_chapters[0].name}
                                  </Link>
                                </p>
                                <p className='line-clamp-2 mt-2'>{item.short_description}</p>
                              </div>
                              <div className='flex gap-1 items-center'>
                                {item.genres.slice(0, 3).map((genre) => {
                                  return genre.id !== undefined ? (
                                    <div key={genre.id}>
                                      <span className='py-[2px] px-1 text-[13px] text-gray-400 border border-dashed border-[#d9d9d9] line-clamp-1'>
                                        {genre.name}
                                      </span>
                                    </div>
                                  ) : null
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
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
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default RecentUpdateSlide
