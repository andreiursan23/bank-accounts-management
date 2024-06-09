import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Root from './layouts/Root'
import Accounts from './pages/Accounts/Accounts'
import Error404 from './pages/Error404/Error404'
import Home from './pages/Home/Home'
import Transfers from './pages/Transfers/Transfers'

export interface Route {
  id: number
  name: string
  path: string | undefined
  element: JSX.Element
  index?: boolean
  navbar?: boolean
}

export const routes: Route[] = [
  {
    id: 1,
    name: 'Home',
    path: undefined,
    index: true,
    element: <Home />,
    navbar: false
  },
  {
    id: 2,
    name: 'Accounts',
    path: '/accounts',
    element: <Accounts />,
    navbar: true
  },
  {
    id: 3,
    name: 'Transfers',
    path: '/transfers',
    element: <Transfers />,
    navbar: true
  }
]

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      {routes.map(({ name, path, index, element }) => (
        <Route key={name} index={index} path={path ?? undefined} element={element} />
      ))}

      <Route path="*" element={<Error404 />} />
    </Route>
  )
)
