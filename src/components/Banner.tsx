import banner1 from '@/assets/img/banner1.jpg'
import banner2 from '@/assets/img/banner2.jpg'
import banner3 from '@/assets/img/banner3.jpg'
import banner4 from '@/assets/img/banner4.jpg'
import banner5 from '@/assets/img/banner5.jpg'
import banner6 from '@/assets/img/banner6.jpg'
import banner7 from '@/assets/img/banner7.jpg'
import banner8 from '@/assets/img/banner8.jpg'
import PATH from '@/utils/path'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useEffect, useRef } from 'react'

const Banner = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (el.current) {
      setIsLoading(false)
    }
  }, [el.current])

  return (
    <section
      ref={el}
      className={`flex gap-[10px] transition-all duration-500 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}
    >
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
            <Link to={`${PATH.comics}/one-piece`} title='One Piece'>
              <div
                className='bg-no-repeat bg-cover w-full h-[380px] bg-center'
                style={{
                  backgroundImage: `url('${banner1}')`
                }}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={`${PATH.comics}/jujutsu-kaisen-chu-thuat-hoi-chien`} title='Jujutsu Kaisen - Chú Thuật Hồi Chiến'>
              <div
                className='bg-no-repeat bg-cover w-full h-[380px] bg-center'
                style={{
                  backgroundImage: `url('${banner2}')`
                }}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={`${PATH.comics}/thanh-guom-diet-quy`} title='Thanh Gươm Diệt Quỷ'>
              <div
                className='bg-no-repeat bg-cover w-full h-[380px] bg-center'
                style={{
                  backgroundImage: `url('${banner3}')`
                }}
              />
            </Link>
          </SwiperSlide>
        </Swiper>
        <div
          id='swiper-banner-pagination'
          className='swiper-pagination right-0 bottom-[2px_!important]'
        />
      </div>
      <div className='flex-shrink-0 grid grid-cols-6 gap-[10px]'>
        <div className='col-span-6 flex items-center gap-[10px]'>
          <Link to={`${PATH.comics}/onepunch-man`} title='Onepunch Man' className='w-[336px] h-[185px] overflow-hidden'>
            <p
              className='bg-no-repeat bg-cover w-full h-full'
              style={{
                backgroundImage: `url(${banner4})`
              }}
            />
          </Link>
          <Link
            to={`${PATH.comics}/mashle-magic-and-muscles`} title='Mashle: Magic And Muscles'
            className='w-[336px] h-[185px] overflow-hidden'
          >
            <p
              className='bg-no-repeat bg-cover w-full h-full'
              style={{
                backgroundImage: `url(${banner5})`
              }}
            />
          </Link>
        </div>
        <div className='col-span-6 flex items-center gap-[10px]'>
          <Link
          title='REINCARNATED AS AN ARISTOCRAT WITH AN APPRAISAL SKILL'
            to={`${PATH.comics}/reincarnated-as-an-aristocrat-with-an-appraisal-skill`}
            className='w-[221px] h-[185px] overflow-hidden'
          >
            <p
              className='bg-no-repeat bg-cover w-full h-full'
              style={{
                backgroundImage: `url(${banner6})`
              }}
            />
          </Link>
          <Link
          title='Tôi Muốn Nhìn Thấy Dáng Vẻ Xấu Hổ Của Cậu'
            to={`${PATH.comics}/toi-muon-nhin-thay-dang-ve-xau-ho-cua-cau`}
            className='w-[221px] h-[185px] overflow-hidden'
          >
            <p
              className='bg-no-repeat bg-cover w-full h-full'
              style={{
                backgroundImage: `url(${banner7})`
              }}
            />
          </Link>
          <Link
          title='Kỹ Năng Vô Dụng [Auto Mode] Bỗng Dưng Thức Tỉnh ~ Hả, Tổ Đội Trinh Sát Mấy Người, Chẳng Phải Đã Nói'
            to={`${PATH.comics}/ky-nang-vo-dung-auto-mode-bong-dung-thuc-tinh-ha-to-doi-trinh-sat-may-nguoi-chang-phai-da-noi`}
            className='w-[221px] h-[185px] overflow-hidden'
          >
            <p
              className='bg-no-repeat bg-cover w-full h-full'
              style={{
                backgroundImage: `url(${banner8})`
              }}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Banner
