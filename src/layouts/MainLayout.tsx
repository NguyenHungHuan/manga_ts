import { Footer, Header, Navbar, SearchBar } from '@/components'
import { Outlet } from 'react-router-dom'

const MainLayout = ({ hideNav = false }: { hideNav?: boolean }) => {
  return (
    <main>
      <div className='sticky top-0 z-20'>
        <Header />
      </div>
      <SearchBar />
      {!hideNav && <Navbar />}
      <Outlet />
      <Footer />
    </main>
  )
}

export default MainLayout
