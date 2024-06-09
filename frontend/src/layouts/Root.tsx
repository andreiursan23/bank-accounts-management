import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

const Root: FC<any> = () => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  )
}

export default Root
