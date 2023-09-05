import { Footer, Header, Navbar, ScrollToTop, SearchBar } from '@/components'
import { useMediaQuery } from 'react-responsive'
import { Outlet } from 'react-router-dom'

const MainLayout = ({ hideNav = false }: { hideNav?: boolean }) => {
  const isMobileMini = useMediaQuery({ maxWidth: 639 })

  return (
    <>
      <header className='sticky top-0 z-20 left-0 right-0'>
        <Header />
      </header>
      <main>
        {!isMobileMini && <SearchBar />}
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
