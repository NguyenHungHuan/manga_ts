import { Footer, Header, ScrollToTop, SearchBar } from '@/components'
import { Outlet } from 'react-router-dom'

const ChapterLayout = () => {
  return (
    <>
      <Header />
      <main>
        <SearchBar />
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
