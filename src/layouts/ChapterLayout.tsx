import { Footer, Header, SearchBar } from '@/components'
import { Outlet } from 'react-router-dom'

const ChapterLayout = () => {
  return (
    <main>
      <Header />
      <SearchBar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default ChapterLayout
