import { WarningTriangle } from 'iconoir-react'
import { Link } from 'react-router-dom'
import CreateTransfer from '../../components/CreateTransfer/CreateTransfer'
import { useGetAccountsQuery } from '../../features/accounts/accountsApiService'
import { Wrapper } from '../../ui'

const Transfers = () => {
  const { data } = useGetAccountsQuery()

  const accounts = data || []

  return (
    <Wrapper>
      <div className="mb-20">
        <div className="mb-10">
          <p className="text-3xl text-primary mb-6">Make a new transfer</p>

          <p className="text-gray-600 mb-6 max-w-full lg:max-w-[60%]">
            Transfer funds between your accounts effortlessly. Select the debit and credit accounts,
            enter the amount, and confirm the details. If the accounts have different currencies,
            the amount will be converted automatically.
          </p>
        </div>

        {accounts.length === 0 ? (
          <span className="flex gap-1 items-center">
            <WarningTriangle className="text-warning" />
            <p className="text-warning">
              No accounts. Please create one first from{' '}
              <span className="underline hover:no-underline">
                <Link to="/accounts">here</Link>
              </span>
              .
            </p>
          </span>
        ) : (
          <CreateTransfer />
        )}
      </div>
    </Wrapper>
  )
}

export default Transfers
