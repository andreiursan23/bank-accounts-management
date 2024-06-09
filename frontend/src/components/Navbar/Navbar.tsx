import { Menu as MenuIcon } from 'iconoir-react'
import { FC } from 'react'
import { Button, Dropdown, Menu, Navbar as UiNavbar } from 'react-daisyui'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../routes'
import { renderRoutes } from './utils'

const Navbar: FC = () => {
  const { pathname } = useLocation()

  return (
    <UiNavbar className="bg-primary">
      <UiNavbar.Start className="w-full justify-between">
        <Link to="/" className="px-4 text-3xl font-semibold text-white tracking-wider">
          myBank
        </Link>

        <div className="lg:hidden">
          <Dropdown end>
            <Button tag="label" color="ghost" tabIndex={0}>
              <MenuIcon color="#fff" />
            </Button>

            <Dropdown.Menu tabIndex={0} className="menu-sm z-10">
              {renderRoutes({ variant: 'mobile', pathname, routes })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </UiNavbar.Start>

      <UiNavbar.End className="hidden lg:flex">
        <Menu horizontal className="p-1">
          {renderRoutes({ variant: 'desktop', pathname, routes })}
        </Menu>
      </UiNavbar.End>
    </UiNavbar>
  )
}

export default Navbar
