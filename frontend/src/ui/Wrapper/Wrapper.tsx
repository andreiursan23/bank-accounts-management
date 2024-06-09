import { FC } from 'react'

interface OwnProps {
  children: React.ReactNode | React.ReactNode[]
  classNames?: string
}

const Wrapper: FC<OwnProps> = ({ children, classNames = '' }) => {
  return <div className={`mx-auto max-w-6xl py-20 px-10 ${classNames}`}>{children}</div>
}

export default Wrapper
