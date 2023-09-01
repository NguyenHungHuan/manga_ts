const Footer = () => {
  return (
    <footer className='bg-gray-200 dark:bg-gray-800 mt-20'>
      <div className='container space-y-8 overflow-hidden py-12'>
        <div className='flex justify-center mt-8 space-x-4'>
          <a
            href='https://www.facebook.com/huan.hung.311'
            rel='noopener noreferrer'
            target='_blank'
            className='text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200'
          >
            <span className='sr-only'>Facebook</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              aria-hidden='true'
              role='img'
              className='icon'
              width='28px'
              height='28px'
              viewBox='0 0 24 24'
              data-v-c3ad5561
            >
              <path
                fill='currentColor'
                d='M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z'
              />
            </svg>
          </a>
          <a
            href='https://github.com/NguyenHungHuan/manga_ts'
            rel='noopener noreferrer'
            target='_blank'
            className='text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200'
          >
            <span className='sr-only'>GitHub</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              aria-hidden='true'
              role='img'
              className='icon'
              width='28px'
              height='28px'
              viewBox='0 0 24 24'
              data-v-c3ad5561
            >
              <path
                fill='currentColor'
                d='M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.104 2.104 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 0 1 1.025-2.688a3.594 3.594 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 0 1 .1 2.65a3.869 3.869 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.368 2.368 0 0 1 .675 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247Z'
              />
            </svg>
          </a>
        </div>
        <p className='mt-8 text-base leading-6 text-center text-gray-500 dark:text-gray-300'>
          © 2023 VComics™. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
