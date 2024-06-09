import { FC } from 'react'
import { Link } from 'react-router-dom'
import AccountsTable from '../../components/AccountsTable/AccountsTable'
import { Wrapper } from '../../ui'

const Home: FC = () => (
  <Wrapper>
    <h1 className="text-3xl font-bold text-primary max-w-96 mb-6">
      Welcome to Bank Accounts Management!
    </h1>
    <p className="text-gray-600 mb-6 max-w-full lg:max-w-[70%]">
      Manage and monitor all your bank accounts in one place. Easily create new accounts, view
      existing ones, and track recent transactions. Stay on top of your finances with detailed
      overviews and quick access to essential banking functions.
    </p>
    <Link to="/accounts" className="btn btn-primary btn-outline mb-16">
      Create a new account
    </Link>

    <p className="text-2xl text-primary mb-4">Existing accounts</p>
    <AccountsTable limitedView />
  </Wrapper>
)

export default Home
