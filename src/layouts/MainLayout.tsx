import { Footer, Header } from '@/components'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}

export default MainLayout
