import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Wrapper } from '../../ui'

const Error404: FC = () => {
  return (
    <Wrapper>
      <div className="py-12 text-center leading-relaxed md:py-32 lg:py-48">
        <h1 className="text-2xl tracking-wide text-orange-500 mb-8">
          Sorry, this page does not exist
        </h1>

        <Link className="text-indigo-500 no-underline hover:underline" to="/">
          Go back to Homepage
        </Link>
      </div>
    </Wrapper>
  )
}

export default Error404
