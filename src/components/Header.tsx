import React from 'react'
import { Button, Navbar } from '.'
import { Link } from 'react-router-dom'
import PATH from '@/utils/path'
import logo from '@/assets/img/logo_mangabz.png'
import iconSearch from '@/assets/img/icon_search.png'

const Header:React.FC = () => {
  return (
    <header className='bg-[#222] dark:bg-black text-white dark:text-white mb-2'>
      <div className='container lg:px-12 px-2 h-[64px]'>
        <div className='flex items-center justify-between h-full'>
          <Link to={PATH.home} className='flex items-center gap-2'>
            <img src={logo} alt='logo' className='w-auto h-[50px] object-contain' />
          </Link>
          <form className='xl:flex lg:flex items-center hidden'>
            <input
              type='text'
              placeholder='Search...'
              className='outline-none bg-[#353535] w-[300px] rounded-full px-4 py-1'
            />
            <Button
              className='flex items-center justify-center rounded-full py-[6px] px-[15px] ml-[-24px] bg-gradient'
              type='submit'
            >
              <img src={iconSearch} alt='icon search' className='w-5' />
            </Button>
          </form>
          <div className='flex items-center gap-4'>
            <Button className='px-2 py-1 active:ring-1 ring-gray-500 rounded-md active:scale-95'>
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
            </Button>
            <Button className='px-2 py-1 active:ring-1 ring-gray-500 rounded-md active:scale-95'>
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
            </Button>
            <Button className='px-2 py-1 active:ring-1 ring-gray-500 rounded-md active:scale-95'>
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
            </Button>
          </div>
        </div>
      </div>
      <Navbar/>
    </header>
  )
}

export default Header
