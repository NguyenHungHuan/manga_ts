import { Link, NavLink, createSearchParams, useLocation, useMatch } from 'react-router-dom'
import PATH from '@/utils/path'
import { useEffect, useMemo, useState } from 'react'
import iconSearch from '/icon_search.webp'
import classNames from 'classnames'
import { SearchBar } from '.'
import { useQueryConfig } from '@/hooks'

const Header = () => {
  const queryConfig = useQueryConfig()
  const { pathname } = useLocation()
  const isMatchTop = useMemo(() => pathname.includes('/top'), [pathname])
  const [OpenTheme, setOpenTheme] = useState<boolean>(false)
  const [OpenNav, setOpenNav] = useState<boolean>(false)

  useEffect(() => {
    document.body.style.overflow = OpenNav ? 'hidden' : 'unset'
  }, [OpenNav])

  useEffect(() => {
    setOpenNav(false)
  }, [pathname, queryConfig.q])

  const handleChangeTheme = (type: 'light' | 'dark') => {
    if (type === 'light') {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      document.body.classList.remove('dark:bg-gray-900')
      localStorage.setItem('theme', 'light')
    }
    if (type === 'dark') {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark:bg-gray-900')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <div className='bg-white text-black dark:bg-gray-900 dark:text-white shadow dark:border-b dark:border-gray-700'>
      <div className='container px-4 xl:px-0 h-[74px] flex items-center justify-between'>
        <div className='flex items-center'>
          <Link
            to={PATH.home}
            title='VTruyen'
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }
          >
            <h1 title='Web đọc truyện Việt Nam' className='font-bold text-3xl text-primary'>
              VTruyện
            </h1>
          </Link>
          {/* navigate */}
          <ul className='hidden sm:flex items-center gap-4 ml-6 mt-1'>
            <li className='hidden lg:block'>
              <Link
                title='Trang chủ VTruyen'
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  })
                }
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
                title='Tất cả thể loại truyện tranh'
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
                title='Truyện tranh mới nhất'
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
                title='Bảng xếp hạng truyện tranh'
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
        {/* options */}
        <div className='hidden sm:flex items-center'>
          <Link
            title='Lịch sử truyện tranh'
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
              <div className='absolute top-10 bg-transparent py-2 z-50'>
                <div className='p-1 lg:p-2 border dark:border-gray-400 shadow-lg rounded-md flex flex-col justify-center items-center bg-white text-black dark:bg-gray-900 dark:text-white'>
                  <button
                    title='Nền sáng'
                    onClick={() => {
                      setOpenTheme(false)
                      handleChangeTheme('light')
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
                    title='Nền tối'
                    onClick={() => {
                      setOpenTheme(false)
                      handleChangeTheme('dark')
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
        {/* hamburger button */}
        <div className='flex sm:hidden items-center gap-1'>
          <button
            title='Tìm kiếm truyện tranh'
            onClick={() => setOpenNav((prev) => !prev)}
            className='bg-center bg-no-repeat w-[18px] h-[18px] p-4'
            style={{
              backgroundImage: `url(${iconSearch})`
            }}
          />
          <button
            title='Menu truyện tranh VTruyen'
            onClick={() => setOpenNav((prev) => !prev)}
            className='flex flex-col gap-[5px] p-2'
          >
            <span
              className={classNames(
                'block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300',
                {
                  'rotate-45 translate-y-2': OpenNav,
                  'rotate-0': !OpenNav
                }
              )}
            />
            <span
              className={classNames(
                'block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300',
                {
                  'opacity-0': OpenNav,
                  'opacity-100': !OpenNav
                }
              )}
            />
            <span
              className={classNames(
                'block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300',
                {
                  '-rotate-45 -translate-y-2': OpenNav,
                  'rotate-0': !OpenNav
                }
              )}
            />
          </button>
        </div>
        {/* hamburger open */}
        <div
          className={`${
            OpenNav ? 'translate-x-0' : 'translate-x-full'
          } duration-200 transition-all dark:bg-gray-800 bg-slate-100 h-full block sm:hidden p-4 pt-0 fixed z-50 inset-0 overflow-y-auto top-[74px]`}
        >
          <SearchBar />
          <ul className='flex flex-col gap-4 text-lg'>
            <li>
              <Link
                title='Trang chủ VTruyen'
                to={PATH.home}
                className={`hover:text-primary text-center block capitalize ${
                  useMatch(PATH.home) && ' text-primary'
                }`}
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                title='Tất cả thể loại truyện tranh'
                to={{
                  pathname: PATH.genres,
                  search: createSearchParams({
                    type: 'all',
                    page: '1'
                  }).toString()
                }}
                className={`hover:text-primary text-center block capitalize ${
                  useMatch(PATH.genres) && ' text-primary'
                }`}
              >
                Thể loại
              </Link>
            </li>
            <li>
              <Link
                title='Truyện tranh mới nhất'
                to={{
                  pathname: PATH.new,
                  search: createSearchParams({
                    status: 'all',
                    page: '1'
                  }).toString()
                }}
                className={`hover:text-primary text-center block capitalize ${
                  useMatch(PATH.new) && ' text-primary'
                }`}
              >
                mới
              </Link>
            </li>
            <li>
              <Link
                title='Bảng xếp hạng truyện tranh'
                to={{
                  pathname: PATH.top,
                  search: createSearchParams({
                    status: 'all',
                    page: '1'
                  }).toString()
                }}
                className={`hover:text-primary text-center block capitalize ${
                  isMatchTop && ' text-primary'
                }`}
              >
                BXH
              </Link>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: PATH.recent,
                  search: createSearchParams({
                    page: '1'
                  }).toString()
                }}
                className={({ isActive }) =>
                  `capitalize block hover:text-primary text-center ${isActive && ' text-primary'}`
                }
              >
                Mới cập nhật
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: PATH.popular,
                  search: createSearchParams({
                    page: '1'
                  }).toString()
                }}
                className={({ isActive }) =>
                  `capitalize block hover:text-primary text-center ${isActive && ' text-primary'}`
                }
              >
                nổi bật
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: PATH.completed,
                  search: createSearchParams({
                    page: '1'
                  }).toString()
                }}
                className={({ isActive }) =>
                  `capitalize block hover:text-primary text-center ${isActive && ' text-primary'}`
                }
              >
                đã hoàn thành
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: PATH.boy,
                  search: createSearchParams({
                    page: '1'
                  }).toString()
                }}
                className={({ isActive }) =>
                  `capitalize block hover:text-primary text-center ${isActive && ' text-primary'}`
                }
              >
                con trai
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: PATH.girl,
                  search: createSearchParams({
                    page: '1'
                  }).toString()
                }}
                className={({ isActive }) =>
                  `capitalize block hover:text-primary text-center ${isActive && ' text-primary'}`
                }
              >
                con gái
              </NavLink>
            </li>
          </ul>
          <div className='flex items-center justify-center mt-4 gap-4'>
            <Link
              to={PATH.history}
              className='flex flex-col items-center px-3 py-1 rounded-md hover:text-primary'
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
            </Link>
            {localStorage.theme !== 'light' ? (
              <button
                onClick={() => {
                  handleChangeTheme('light')
                  setOpenNav(false)
                }}
                className='active:scale-90 rounded-md py-1 px-3'
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
              </button>
            ) : (
              <button
                onClick={() => {
                  handleChangeTheme('dark')
                  setOpenNav(false)
                }}
                className='active:scale-90 rounded-md py-1 px-3'
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
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header
