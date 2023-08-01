import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './layouts'
import { Home } from './pages'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      // errorElement: <MainLayout />,
      children: [
        {
          index: true,
          path: '/',
          element: <Home />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
