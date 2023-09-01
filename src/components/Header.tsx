import { Link, createSearchParams, useLocation, useMatch } from 'react-router-dom'
import PATH from '@/utils/path'
import { useMemo, useState } from 'react'

const Header = () => {
  const { pathname } = useLocation()
  const isMatchTop = useMemo(() => pathname.includes('/top'), [pathname])
  const [OpenTheme, setOpenTheme] = useState<boolean>(false)

  return (
    <header className='bg-white text-black dark:bg-gray-900 dark:text-white shadow dark:border-b dark:border-gray-700'>
      <div className='container h-[74px] flex items-center justify-between'>
        <div className='flex items-center'>
          <Link to={PATH.home}>
            <h1
              title='Web đọc truyện Việt Nam'
              className='font-bold text-3xl text-primary'
            >
              VTruyện
            </h1>
          </Link>
          <ul className='flex items-center gap-4 ml-6 mt-1'>
            <li>
              <Link
                to={PATH.home}
                className={`hover:text-primary text-lg capitalize ${
                  useMatch(PATH.home) && ' text-primary'
                }`}
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: PATH.genres,
                  search: createSearchParams({
                    type: 'all',
                    page: '1'
                  }).toString()
                }}
                className={`hover:text-primary text-lg capitalize ${
                  useMatch(PATH.genres) && ' text-primary'
                }`}
              >
                Thể loại
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: PATH.new,
                  search: createSearchParams({
                    status: 'all',
                    page: '1'
                  }).toString()
                }}
                className={`hover:text-primary text-lg capitalize ${
                  useMatch(PATH.new) && ' text-primary'
                }`}
              >
                mới
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: PATH.top,
                  search: createSearchParams({
                    status: 'all',
                    page: '1'
                  }).toString()
                }}
                className={`hover:text-primary text-lg capitalize ${isMatchTop && ' text-primary'}`}
              >
                BXH
              </Link>
            </li>
          </ul>
        </div>
        <div className='flex items-center gap-4'>
          <Link
            to={PATH.history}
            className='flex flex-col items-center px-2 py-1 rounded-md hover:text-primary'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span className='capitalize text-xs mt-[2px]'>lịch sử</span>
          </Link>
          <button className='flex flex-col items-center px-2 py-1 hover:text-primary'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='capitalize text-xs mt-[2px]'>Ngôn ngữ</span>
          </button>
          <div
            onMouseEnter={() => setOpenTheme(true)}
            onMouseLeave={() => setOpenTheme(false)}
            className='relative flex flex-col items-center px-2 py-1 hover:text-primary cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
              />
            </svg>
            <span className='capitalize text-xs mt-[2px]'>giao diện</span>
            {OpenTheme && (
              <div className='absolute top-10 bg-transparent px-4 py-2 z-50'>
                <div className='p-2 border dark:border-gray-400 shadow-lg rounded-md flex flex-col justify-center items-center bg-white text-black dark:bg-gray-900 dark:text-white'>
                  <button
                    onClick={() => {
                      setOpenTheme(false)
                      document.documentElement.classList.remove('dark')
                      document.documentElement.classList.add('light')
                      document.body.classList.remove('dark:bg-gray-900')
                      localStorage.setItem('theme', 'light')
                    }}
                    className='active:scale-90 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-md py-1 px-2 flex items-center justify-start gap-2 min-w-[80px]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                      />
                    </svg>
                    Sáng
                  </button>
                  <span className='h-[1px] w-[80%] border-b border-dashed my-1' />
                  <button
                    onClick={() => {
                      setOpenTheme(false)
                      document.documentElement.classList.remove('light')
                      document.documentElement.classList.add('dark')
                      document.body.classList.add('dark:bg-gray-900')
                      localStorage.setItem('theme', 'dark')
                    }}
                    className='active:scale-90 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-md py-1 px-2 flex items-center justify-start gap-2 min-w-[80px]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
                      />
                    </svg>
                    Tối
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
