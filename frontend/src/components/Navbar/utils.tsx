import { Link } from 'react-router-dom'
import { Route } from '../../routes'

interface RenderRoutesProps {
  variant: 'mobile' | 'desktop'
  routes: Route[]
  pathname: string
}

export const renderRoutes = ({
  variant,
  routes,
  pathname
}: RenderRoutesProps): (JSX.Element | null)[] => {
  const isMobile = variant === 'mobile'

  return routes.map(({ id, name, path, navbar }) => {
    if (!path || !navbar) return null

    const btnClassName = isMobile
      ? `text-lg p-4 font-normal ${path === pathname ? 'underline' : ''}`
      : `text-white py-2 px-4 text-lg font-normal hover:underline ${
          path === pathname ? 'underline' : ''
        }`

    return (
      <Link key={id} to={path} color="ghost" className={btnClassName}>
        {name}
      </Link>
    )
  })
}
