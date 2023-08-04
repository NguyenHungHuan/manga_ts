import PATH from '@/utils/path'
import React from 'react'
import { Link } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css'
import { comics } from '@/types/data'
import { CardItem } from '.'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

interface Props {
  title?: string
  slidesView?: number
  dataComics: comics[]
}

const Slider: React.FC<Props> = ({ title, dataComics, slidesView = 6 }) => {
  return (
    <>
    {dataComics && (
      <>
        <div className='flex items-center justify-between'>
          <h2 className='mt-4 mb-5 capitalize font-semibold text-xl'>{title}</h2>
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
        <Swiper
          slidesPerView={slidesView}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            320: {
              slidesPerView: 2
            },
            576: {
              slidesPerView: 3
            },
            768: {
              slidesPerView: 4
            },
            1200:{
              slidesPerView: slidesView
            }
          }}
        >
          {dataComics.map((item) => (
            <SwiperSlide key={item.id}>
              <CardItem comics={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )}
      
    </>
  )
}

export default Slider
