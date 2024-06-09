import { FC } from 'react'
import AccountsTable from '../../components/AccountsTable/AccountsTable'
import CreateAccountForm from '../../components/CreateAccountForm/CreateAccountForm'
import { Wrapper } from '../../ui'

const Accounts: FC = () => {
  return (
    <Wrapper>
      <div className="mb-20">
        <p className="text-3xl text-primary mb-6">Create a new account</p>
        <p className="text-gray-600 mb-6 max-w-full lg:max-w-[60%]">
          Easily set up a new bank account to start managing your finances. Fill in the required
          details, and you'll be ready to use your new account in no time.
        </p>

        <CreateAccountForm />
      </div>

      <p className="text-3xl text-primary mb-6">Existing accounts</p>
      <p className="text-gray-600 mb-10 max-w-full lg:max-w-[60%]">
        View and manage all your existing bank accounts in one place. Keep track of your balances
        and other actions for efficient financial management.
      </p>

      <AccountsTable />
    </Wrapper>
  )
}

export default Accounts
