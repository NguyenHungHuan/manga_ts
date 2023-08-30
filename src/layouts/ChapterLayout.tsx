import { Footer, Header, ScrollToTop, SearchBar } from '@/components'
import { Outlet } from 'react-router-dom'

const ChapterLayout = () => {
  return (
    <>
      <Header />
      <main>
        <SearchBar />
        <Outlet />
        <ScrollToTop/>
      </main>
      <Footer />
    </>
  )
}

export default ChapterLayout
