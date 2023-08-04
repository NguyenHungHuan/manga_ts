import banner1 from '@/assets/img/banner1.jpg'
import banner2 from '@/assets/img/banner2.jpg'
import banner3 from '@/assets/img/banner3.jpg'
import banner4 from '@/assets/img/banner4.jpg'
import banner5 from '@/assets/img/banner5.jpg'
import banner6 from '@/assets/img/banner6.jpg'
import banner7 from '@/assets/img/banner7.jpg'
import banner8 from '@/assets/img/banner8.jpg'
import PATH from '@/utils/path'
import React from 'react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Banner: React.FC = () => {
  return (
    <div className='flex gap-[10px]'>
      <div className='w-[510px] relative'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          modules={[Autoplay, Pagination]}
          pagination={{ el: '.swiper-pagination', clickable: true }}
        >
          <SwiperSlide>
            <Link to={PATH.home}>
              <div
                className='bg-no-repeat bg-cover w-full h-[380px] bg-center'
                style={{
                  backgroundImage: `url('${banner1}')`
                }}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={PATH.home}>
              <div
                className='bg-no-repeat bg-cover w-full h-[380px] bg-center'
                style={{
                  backgroundImage: `url('${banner2}')`
                }}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={PATH.home}>
              <div
                className='bg-no-repeat bg-cover w-full h-[380px] bg-center'
                style={{
                  backgroundImage: `url('${banner3}')`
                }}
              />
            </Link>
          </SwiperSlide>
        </Swiper>
        <div className='swiper-pagination right-0 bottom-[2px]' />
      </div>
      <div className='flex-shrink-0'>
        <div className='grid grid-cols-6 gap-[10px]'>
          <div className='col-span-6 flex items-center gap-[10px]'>
            <Link to={PATH.home}>
              <img src={banner4} alt='' className='w-[336px] h-[185px] object-cover' />
            </Link>
            <Link to={PATH.home}>
              <img src={banner5} alt='' className='w-[336px] h-[185px] object-cover' />
            </Link>
          </div>
          <div className='col-span-6 flex items-center gap-[10px]'>
            <Link to={PATH.home}>
              <img src={banner6} alt='' className='w-[221px] h-[185px] object-cover' />
            </Link>
            <Link to={PATH.home}>
              <img src={banner7} alt='' className='w-[221px] h-[185px] object-cover' />
            </Link>
            <Link to={PATH.home}>
              <img src={banner8} alt='' className='w-[221px] h-[185px] object-cover' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
