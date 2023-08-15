import PATH from '@/utils/path'
import classNames from 'classnames'
import React from 'react'
import { Link, NavLink, createSearchParams, useMatch } from 'react-router-dom'

const Navbar: React.FC = () => {
  const isHome = useMatch(PATH.home)

  return (
    <div
      className={classNames('text-black/60 dark:text-white', {
        'bg-white dark:bg-gradient': isHome,
        'bg-[#f8f8f9] p-5': !isHome
      })}
    >
      <nav
        className={classNames('container h-[56px]', {
          'py-[15px]': isHome,
          'py-10 px-4 bg-white border-t-[3px] border-primary': !isHome
        })}
      >
        <ul className='flex items-center gap-2 h-full'>
          {!isHome && <li className='uppercase font-semibold text-sm py-4 text-black'>chủ đề:</li>}
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
              to='https://www.facebook.com/groups/860444028385945'
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
              to='https://www.facebook.com/nettruyen/'
              className='uppercase font-semibold text-sm hover:text-primary px-1 py-4'
            >
              fanpage
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
