import PATH from '@/utils/path'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <div className='bg-white text-black/60 dark:bg-gradient dark:text-white'>
      <nav className='container h-[56px] py-[15px]'>
        <ul className='flex items-center gap-2 h-full'>
          <li>
            <Link
              to={PATH.home}
              className='uppercase font-semibold text-sm hover:text-primary px-1 py-4'
            >
              Mới cập nhật
            </Link>
          </li>
          <li>
            <Link
              to={PATH.home}
              className='uppercase font-semibold text-sm hover:text-primary px-1 py-4'
            >
              Đề xuất
            </Link>
          </li>
          <li>
            <Link
              to={PATH.home}
              className='uppercase font-semibold text-sm hover:text-primary px-1 py-4'
            >
              nổi bật
            </Link>
          </li>
          <li>
            <Link
              to={PATH.home}
              className='uppercase font-semibold text-sm hover:text-primary px-1 py-4'
            >
              đã hoàn thành
            </Link>
          </li>
          <li>
            <Link
              to={PATH.home}
              className='uppercase font-semibold text-sm hover:text-primary px-1 py-4'
            >
              con trai
            </Link>
          </li>
          <li>
            <Link
              to={PATH.home}
              className='uppercase font-semibold text-sm hover:text-primary px-1 py-4'
            >
              con gái
            </Link>
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
