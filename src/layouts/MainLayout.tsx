import { Footer, Header, Navbar, ScrollToTop, SearchBar } from '@/components'
import { Outlet } from 'react-router-dom'

const MainLayout = ({ hideNav = false }: { hideNav?: boolean }) => {
  return (
    <>
      <div className='sticky top-0 z-20'>
        <Header />
      </div>
      <main>
        <SearchBar />
        {!hideNav && <Navbar />}
        <Outlet />
        <div className='hidden md:block'>
          <ScrollToTop />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
