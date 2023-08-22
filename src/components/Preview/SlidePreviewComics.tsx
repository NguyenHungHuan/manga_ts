import { comics } from '@/types/data'
import { formatCurrency } from '@/utils/formatNumber'
import PATH from '@/utils/path'
import { useState } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import 'swiper/css'
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CardItem } from '..'
import imgError from '@/assets/img/img-error.png'
interface Props {
  data: comics[]
}

const SlidePreviewComics = ({ data }: Props) => {
  const [activeSlide, setActiveSlide] = useState<number>()

  return (
    <div className='mt-[15px] h-[640px]'>
      {data && (
        <div className='flex items-center gap-4'>
          <div className='w-[496px] flex flex-col gap-5 overflow-hidden'>
            <div className='h-[350px] cursor-grab'>
              <Swiper
                onSlideChange={(e) => setActiveSlide(e.realIndex)}
                className='h-full'
                style={{
                  overflow: 'unset'
                }}
                effect={'coverflow'}
                slidesPerView={2}
                centeredSlides={true}
                loop={true}
                grabCursor={true}
                modules={[EffectCoverflow]}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: false
                }}
              >
                {data.slice(0, 5).map((item) => (
                  <SwiperSlide key={item.id}>
                    {({ isActive }) => {
                      return (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          title={item.title}
                          className={`${
                            isActive && 'shadow-lg z-10'
                          }  w-full h-full object-cover border-[10px] border-white block`}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null
                            currentTarget.src = imgError
                          }}
                        />
                      )
                    }}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className='h-[263px]'>
              {data.map((item, i) => (
                <div key={item.id}>
                  {i === activeSlide && (
                    <div className='transition-all duration-300'>
                      <div className='flex items-center justify-between gap-6'>
                        <Link
                          to={`${PATH.comics}/${item.id}`}
                          title={item.title}
                          className='hover:text-primary font-semibold text-xl truncate'
                        >
                          {item.title}
                        </Link>
                        <Link
                          to={`${PATH.chapters}/${item.id}/${item.last_chapter.id}`}
                          className='text-white flex-shrink-0 text-sm bg-primary w-[100px] h-[34px] uppercase font-semibold flex items-center justify-center rounded text-center'
                        >
                          Đọc Ngay
                        </Link>
                      </div>
                      <span className='text-base text-gray-400 mt-4 block'>{item.updated_at}</span>
                      <p className='text-base mt-1 block truncate'>
                        <span className='mr-1 text-gray-400'>Cập nhật:</span>
                        <Link
                          to={`${PATH.chapters}/${item.id}/${item.last_chapter.id}`}
                          title={item.last_chapter.name}
                          className='text-primary'
                        >
                          {item.last_chapter.name}
                        </Link>
                      </p>
                      <span className='text-base mt-1 block text-gray-400'>
                        Lượt xem:{' '}
                        <strong className='text-black font-normal lowercase'>
                          {formatCurrency(item.total_views)}
                        </strong>
                      </span>
                      <div className='flex gap-[6px] items-center mt-2'>
                        {item.genres.slice(0, 5).map((genre) => {
                          return genre.id !== undefined ? (
                            <Link
                              to={{
                                pathname: PATH.genres,
                                search: createSearchParams({
                                  type: genre.id,
                                  page: '1'
                                }).toString()
                              }}
                              title={genre.name}
                              key={genre.id}
                            >
                              <span className='py-1 px-2 text-[13px] border border-dashed border-[#d9d9d9] hover:text-primary hover:border-primary truncate'>
                                {genre.name}
                              </span>
                            </Link>
                          ) : null
                        })}
                      </div>
                      <p className='text-base text-gray-400 line-clamp-3 mt-4'>
                        {item.short_description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <ul className='w-[688px] grid grid-cols-4 gap-x-[2.5px] gap-y-5'>
            {data &&
              data.slice(5, 13).map((item) => (
                <li key={item.id}>
                  <CardItem
                    chapterName={item.last_chapter.name}
                    chapterId={item.last_chapter.id}
                    description={item.short_description}
                    id={item.id}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    updated_at={item.updated_at}
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SlidePreviewComics
