import { useQueryConfig } from '@/hooks'
import PATH from '@/utils/path'
import classNames from 'classnames'
import { useMemo } from 'react'
import { Link, NavLink, createSearchParams, useLocation, useMatch } from 'react-router-dom'

const Navbar = () => {
  const { pathname } = useLocation()
  const isHome = useMatch(PATH.home)
  const isTop = useMemo(() => pathname.includes(PATH.top), [pathname])
  const queryConfig = useQueryConfig()

  return (
    <div
      className={classNames('text-black/60 dark:text-white', {
        'bg-white dark:bg-gray-900': isHome,
        'bg-[#f8f8f9] dark:bg-gray-800 p-5': !isHome
      })}
    >
      <nav
        className={classNames('container h-[56px]', {
          'py-[15px]': isHome,
          'py-10 px-4 bg-white dark:bg-gray-900 border-t-[3px] border-primary': !isHome
        })}
      >
        <ul className='flex items-center gap-3 h-full'>
          {!isHome && !isTop && (
            <li className='uppercase font-semibold text-sm py-4 text-black dark:text-gray-400'>chủ đề:</li>
          )}
          {!isTop && (
            <>
              <li>
                <NavLink
                  to={{
                    pathname: PATH.recent,
                    search: createSearchParams({
                      page: '1'
                    }).toString()
                  }}
                  className={({ isActive }) =>
                    `uppercase font-semibold text-sm hover:text-primary px-1 py-4 ${
                      isActive && ' text-primary'
                    }`
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
                    `uppercase font-semibold text-sm hover:text-primary px-1 py-4 ${
                      isActive && ' text-primary'
                    }`
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
                    `uppercase font-semibold text-sm hover:text-primary px-1 py-4 ${
                      isActive && ' text-primary'
                    }`
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
                    `uppercase font-semibold text-sm hover:text-primary px-1 py-4 ${
                      isActive && ' text-primary'
                    }`
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
                    `uppercase font-semibold text-sm hover:text-primary px-1 py-4 ${
                      isActive && ' text-primary'
                    }`
                  }
                >
                  con gái
                </NavLink>
              </li>
              <li className='ml-auto'>
                <Link
                  to='https://github.com/NguyenHungHuan/manga_ts'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='relative uppercase font-semibold text-sm hover:text-primary px-1 py-4 flex items-center gap-1'
                >
                  <span>GROUP</span>
                  <span className='relative flex h-3 w-3'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75' />
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-secondary' />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  to='https://www.facebook.com/huan.hung.311'
                  className='uppercase font-semibold text-sm hover:text-primary px-1 py-4'
                >
                  fanpage
                </Link>
              </li>
            </>
          )}
          {isTop && (
            <>
              <li>
                <NavLink
                  to={{
                    pathname: PATH.top,
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1'
                    }).toString()
                  }}
                  className={classNames(
                    'capitalize font-semibold text-[15px] hover:text-primary px-1 py-4 flex items-center justify-center gap-1',
                    {
                      'text-primary': pathname === PATH.top,
                      'text-current': pathname !== PATH.top
                    }
                  )}
                >
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth={0}
                    viewBox='0 0 512 512'
                    className='w-5 h-5'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M102.594 25.97l90.062 345.78L481.844 395 391.75 49.22 102.594 25.97zm-18.906 1.593c-30.466 11.873-55.68 53.098-49.75 75.312l3.25 11.78c.667-1.76 1.36-3.522 2.093-5.28C49.19 85.668 65.84 62.61 89.657 50.47l-5.97-22.907zm44.937 18.906l247.813 21.593 80.937 305.156-249.344-20.064L128.626 46.47zM94.53 69.155c-16.66 10.01-29.916 28.068-38 47.406-5.245 12.552-8.037 25.64-8.75 36.532l64.814 235.28c.293-.55.572-1.105.875-1.655 10.6-19.254 27.822-37.696 51.124-48.47L94.53 69.156zm74.876 287.563c-17.673 9.067-31.144 23.712-39.562 39-4.464 8.105-7.262 16.36-8.688 23.75l11.688 42.405 1.625.125c-3.825-27.528 11.382-60.446 41.25-81.03l-6.314-24.25zm26.344 34.03c-32.552 17.26-46.49 52.402-41.844 72.906l289.844 24.53c-5.315-7.75-8.637-17.84-8.594-28.342l-22.562-9.063 46.625-7.31-13.595-12.97c5.605-6.907 13.688-13.025 24.78-17.656L195.75 390.75z' />
                  </svg>
                  Top truyện
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${PATH.top}${PATH.daily}`,
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1'
                    }).toString()
                  }}
                  className={({ isActive }) =>
                    `capitalize font-semibold text-[15px] hover:text-primary px-1 py-4 flex items-center justify-center gap-1 ${
                      isActive && ' text-primary'
                    }`
                  }
                >
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth={0}
                    viewBox='0 0 512 512'
                    className='w-5 h-5'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      width={416}
                      height={384}
                      x={48}
                      y={80}
                      fill='none'
                      strokeLinejoin='round'
                      strokeWidth={32}
                      rx={48}
                    />
                    <path
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={32}
                      d='M128 48v32m256-32v32'
                    />
                    <rect
                      width={96}
                      height={96}
                      x={112}
                      y={224}
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={32}
                      rx={13}
                    />
                    <path
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={32}
                      d='M464 160H48'
                    />
                  </svg>
                  Top ngày
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${PATH.top}${PATH.weekly}`,
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1'
                    }).toString()
                  }}
                  className={({ isActive }) =>
                    `capitalize font-semibold text-[15px] hover:text-primary px-1 py-4 flex items-center justify-center gap-1 ${
                      isActive && ' text-primary'
                    }`
                  }
                >
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth={0}
                    viewBox='0 0 16 16'
                    className='w-5 h-5'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z' />
                    <path d='M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z' />
                  </svg>
                  Top tuần
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${PATH.top}${PATH.monthly}`,
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1'
                    }).toString()
                  }}
                  className={({ isActive }) =>
                    `capitalize font-semibold text-[15px] hover:text-primary px-1 py-4 flex items-center justify-center gap-1 ${
                      isActive && ' text-primary'
                    }`
                  }
                >
                  <svg
                    stroke='currentColor'
                    strokeWidth={0}
                    viewBox='0 0 24 24'
                    className='w-6 h-6 fill-slate-500/80'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z' />
                  </svg>
                  Top tháng
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${PATH.top}${PATH.chapter}`,
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1'
                    }).toString()
                  }}
                  className={({ isActive }) =>
                    `capitalize font-semibold text-[15px] hover:text-primary px-1 py-4 flex items-center justify-center gap-[2px] ${
                      isActive && ' text-primary'
                    }`
                  }
                >
                  <svg
                    data-v-c3ad5561
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='w-6 h-6'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fill='currentColor'
                      d='M12 5.5a.5.5 0 0 1-.41.492L11.5 6h-4a.5.5 0 0 1-.09-.992L7.5 5h4a.5.5 0 0 1 .5.5ZM12 9a.5.5 0 0 1-.41.492l-.09.008h-4a.5.5 0 0 1-.09-.992L7.5 8.5h4a.5.5 0 0 1 .5.5Zm0 3.5a.5.5 0 0 1-.41.492L11.5 13h-4a.5.5 0 0 1-.09-.992L7.5 12h4a.5.5 0 0 1 .5.5ZM6 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6ZM5 14V4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Zm11-6a1 1 0 0 1 1 1v5.06A3.94 3.94 0 0 1 13.06 18H7a1 1 0 0 1-1-1h7a3 3 0 0 0 3-3V8Z'
                    />
                  </svg>
                  Top tập
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${PATH.top}${PATH.follow}`,
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1'
                    }).toString()
                  }}
                  className={({ isActive }) =>
                    `capitalize font-semibold text-[15px] hover:text-primary px-1 py-4 flex items-center justify-center gap-[2px] ${
                      isActive && ' text-primary'
                    }`
                  }
                >
                  <svg
                    data-v-c3ad5561
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='w-6 h-6'
                    viewBox='0 0 256 256'
                  >
                    <path
                      fill='currentColor'
                      d='M117.25 157.92a60 60 0 1 0-66.5 0a95.83 95.83 0 0 0-47.22 37.71a8 8 0 1 0 13.4 8.74a80 80 0 0 1 134.14 0a8 8 0 0 0 13.4-8.74a95.83 95.83 0 0 0-47.22-37.71ZM40 108a44 44 0 1 1 44 44a44.05 44.05 0 0 1-44-44Zm210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16a44 44 0 1 0-16.34-84.87a8 8 0 1 1-5.94-14.85a60 60 0 0 1 55.53 105.64a95.83 95.83 0 0 1 47.22 37.71a8 8 0 0 1-2.33 11.07Z'
                    />
                  </svg>
                  Top theo dõi
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${PATH.top}${PATH.comment}`,
                    search: createSearchParams({
                      ...queryConfig,
                      page: '1'
                    }).toString()
                  }}
                  className={({ isActive }) =>
                    `capitalize font-semibold text-[15px] hover:text-primary px-1 py-4 flex items-center justify-center gap-[2px] ${
                      isActive && ' text-primary'
                    }`
                  }
                >
                  <svg
                    data-v-c3ad5561
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='w-6 h-6'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fill='currentColor'
                      d='M10.48 13.842h4.92c.896 0 1.6-.713 1.6-1.566v-6.71C17 4.713 16.296 4 15.4 4H4.6C3.704 4 3 4.713 3 5.566v6.71c0 .853.704 1.566 1.6 1.566h1.6V17h.003l.002-.001l4.276-3.157ZM6.8 17.803a1.009 1.009 0 0 1-1.4-.199a.978.978 0 0 1-.199-.59v-2.172h-.6c-1.436 0-2.6-1.149-2.6-2.566v-6.71C2 4.149 3.164 3 4.6 3h10.8C16.836 3 18 4.149 18 5.566v6.71c0 1.418-1.164 2.566-2.6 2.566h-4.59l-4.011 2.961Z'
                    />
                  </svg>
                  Top bình luận
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
