import { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [isShow, setIsShow] = useState<boolean>(false)

  let heightToHide = 250
  const listenToScroll = () => {
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop
    if (windowScroll > heightToHide) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () => window.removeEventListener('scroll', listenToScroll)
  }, [])

  return (
    <button
      onClick={() => {
        window.scroll({
          top: 0,
          behavior: 'smooth'
        })
      }}
      className={`active:scale-75 fixed p-2 bottom-6 right-6 flex items-center justify-center aspect-square rounded-full shadow-md border bg-white -rotate-45 transition-all duration-200 sm:bottom-6 sm:right-6 ${
        isShow ? ' opacity-1 pointer-events-auto' : ' opacity-0 pointer-events-none translate-y-3'
      }`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        aria-hidden='true'
        className='h-9 w-9'
        viewBox='0 0 20 20'
        data-v-c3ad5561
      >
        <path
          fill='currentColor'
          d='M10.755 6.426a1.998 1.998 0 1 1 2.825 2.827a1.998 1.998 0 0 1-2.825-2.827Zm2.119.708a.998.998 0 1 0-1.413 1.411a.998.998 0 0 0 1.413-1.411Zm-1.125 7.37a1.5 1.5 0 0 1-1.704-.295l-.609-.609l-.732 1.22a.5.5 0 0 1-.782.097l-2.83-2.831a.5.5 0 0 1 .096-.782l1.22-.732l-.61-.61a1.5 1.5 0 0 1-.295-1.703l-1.12-1.12a.5.5 0 0 1 0-.707l1.06-1.06a3.003 3.003 0 0 1 3.413-.589l.938-.937a6.294 6.294 0 0 1 6.33-1.557c.76.238 1.357.834 1.595 1.595a6.293 6.293 0 0 1-1.557 6.33l-.937.938a3.003 3.003 0 0 1-.59 3.413l-1.059 1.06a.5.5 0 0 1-.707 0l-1.12-1.12Zm4.076-11.26a5.294 5.294 0 0 0-5.324 1.309l-.816.815l.004.004l-.707.707l-.004-.004l-2.122 2.122l.004.004l-.403.403a.5.5 0 0 0 .048.651l4.248 4.247a.5.5 0 0 0 .652.047l.402-.401l.003.004l2.122-2.122l-.003-.004l.707-.707l.003.004l.816-.816a5.294 5.294 0 0 0 1.31-5.325a1.432 1.432 0 0 0-.94-.938Zm-3.307 10.615l.704.705l.707-.707a2.001 2.001 0 0 0 .52-1.93l-1.931 1.932Zm-4.438-8.3a2.001 2.001 0 0 0-1.93.52l-.706.707l.705.704l1.93-1.93Zm.627 7.312l-1.57-1.57l-.886.53l1.925 1.926l.531-.886Zm-2.904 2.04a.5.5 0 1 0-.707-.706l-1.768 1.768a.5.5 0 1 0 .707.707l1.768-1.768ZM4.388 12.79a.5.5 0 0 1 0 .707l-.71.709a.5.5 0 0 1-.706-.708l.709-.708a.5.5 0 0 1 .707 0Zm2.83 3.537a.5.5 0 0 0-.707-.707l-.709.709a.5.5 0 1 0 .707.707l.71-.709Z'
        />
      </svg>
    </button>
  )
}

export default ScrollToTop
