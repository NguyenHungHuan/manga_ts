import { Footer, Header, ScrollToTop, SearchBar } from '@/components'
import { useMediaQuery } from 'react-responsive'
import { Outlet } from 'react-router-dom'

const ChapterLayout = () => {
  const isMobileMini = useMediaQuery({ maxWidth: 639 })

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        {!isMobileMini && <SearchBar />}
        <Outlet />
        <div className='hidden md:block'>
          <ScrollToTop />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ChapterLayout
