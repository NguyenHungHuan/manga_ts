import banner1 from '../../public/banner1.webp'
import banner2 from '../../public/banner2.webp'
import banner3 from '../../public/banner3.webp'
import banner4 from '../../public/banner4.webp'
import banner5 from '../../public/banner5.webp'
import banner6 from '../../public/banner6.webp'
import banner7 from '../../public/banner7.webp'
import banner8 from '../../public/banner8.webp'
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
      className={`flex gap-[10px] mt-2 sm:mt-0 transition-all duration-500 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className='w-full md:w-[65%] lg:w-[510px] relative'>
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
            <Link to={`${PATH.comics}/dao-hai-tac`} title='One Piece'>
              <div
                className='bg-no-repeat bg-cover w-full h-[260px] md:h-[380px] bg-top md:bg-center'
                style={{
                  backgroundImage: `url('${banner1}')`
                }}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              to={`${PATH.comics}/chu-thuat-hoi-chien`}
              title='Jujutsu Kaisen - Chú Thuật Hồi Chiến'
            >
              <div
                className='bg-no-repeat bg-cover w-full h-[260px] md:h-[380px] bg-bottom md:bg-center'
                style={{
                  backgroundImage: `url('${banner2}')`
                }}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={`${PATH.comics}/thanh-guom-diet-quy`} title='Thanh Gươm Diệt Quỷ'>
              <div
                className='bg-no-repeat bg-cover w-full h-[260px] md:h-[380px] bg-top md:bg-center'
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
      <div className='flex-shrink-0 hidden md:grid grid-cols-6 gap-[10px] flex-1'>
        <div className='col-span-6 flex lg:flex-row flex-col items-center gap-[10px]'>
          <Link
            to={`${PATH.comics}/anh-hung-onepunch`}
            title='Onepunch Man'
            className='w-full h-[185px] overflow-hidden'
          >
            <p
              className='bg-no-repeat bg-cover w-full h-full bg-center'
              style={{
                backgroundImage: `url(${banner4})`
              }}
            />
          </Link>
          <Link
            to={`${PATH.comics}/mashle-muscles-and-magic`}
            title='Mashle: Magic And Muscles'
            className='w-full h-[185px] overflow-hidden'
          >
            <p
              className='bg-no-repeat bg-cover w-full h-full bg-center'
              style={{
                backgroundImage: `url(${banner5})`
              }}
            />
          </Link>
        </div>
        <div className='col-span-6 items-center gap-[10px] md:hidden lg:flex'>
          <Link
            title='REINCARNATED AS AN ARISTOCRAT WITH AN APPRAISAL SKILL'
            to={`${PATH.comics}/tai-sinh-thanh-quy-toc-voi-ki-nang-appraisal`}
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
