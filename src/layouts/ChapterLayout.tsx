import { Footer, Header, SearchBar } from '@/components'
import { Outlet } from 'react-router-dom'

const ChapterLayout = () => {
  return (
    <>
      <Header />
      <main>
        <SearchBar />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default ChapterLayout
