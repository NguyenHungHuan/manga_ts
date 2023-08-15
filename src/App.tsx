import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './layouts'
import { ComicsList, Home } from './pages'
import PATH from './utils/path'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      // errorElement: <MainLayout />,
      children: [
        {
          index: true,
          path: PATH.home,
          element: <Home />
        },
        {
          path: PATH.recent,
          element: <ComicsList />
        },
        {
          path: PATH.recommend,
          element: <ComicsList />
        },
        {
          path: PATH.popular,
          element: <ComicsList />
        },
        {
          path: PATH.completed,
          element: <ComicsList />
        },
        {
          path: PATH.boy,
          element: <ComicsList />
        },
        {
          path: PATH.girl,
          element: <ComicsList />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
