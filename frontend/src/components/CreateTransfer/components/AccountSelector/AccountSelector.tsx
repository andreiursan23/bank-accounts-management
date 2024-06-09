import { FC } from 'react'
import { Checkbox, Table } from 'react-daisyui'
import { useGetAllOwnerIdsQuery } from '../../../../features/accounts/accountsApiService'
import { Account, Currency } from '../../../../features/accounts/types'
import { DEFAULT_ERROR_MESSAGE } from '../../../../redux/utils'
import { Loader, Select } from '../../../../ui'
import { getOwnerIdsOptions } from '../../utils'

interface OwnProps {
  type: 'debit' | 'credit'
  loading: boolean
  ownerId: string | undefined
  excludeOwnerId?: string
  handleSelectOwnerId: (value: string) => void
  showAccounts: boolean | undefined
  accounts: Account[] | undefined
  handleSelectAccountId: (id: number, currency: Currency, balance?: number) => void
  accountId: number | undefined
}

const AccountSelector: FC<OwnProps> = ({
  type,
  loading,
  ownerId,
  excludeOwnerId,
  handleSelectOwnerId,
  showAccounts,
  accounts,
  handleSelectAccountId,
  accountId
}) => {
  const { data: ownerIds, isError } = useGetAllOwnerIdsQuery()

  return (
    <div>
      <Select
        id={`${type}OwnerId`}
        label="Owner ID"
        placeholder="Owner ID"
        options={getOwnerIdsOptions(ownerIds).filter(ownerId => ownerId.value !== excludeOwnerId)}
        value={ownerId}
        onChange={value => handleSelectOwnerId(value)}
        errorMessage={isError ? DEFAULT_ERROR_MESSAGE : undefined}
      />

      {loading && (
        <div className="mx-auto max-w-6xl p-10 flex justify-center">
          <Loader />
        </div>
      )}

      {showAccounts && (
        <div className="overflow-x-auto p-4 border-solid border-[1px] border-primary rounded">
          <Table>
            <Table.Head>
              <span></span>
              <span className="text-sm font-extralight">Account #</span>
              <span className="text-sm font-extralight">Balance</span>
              <span className="text-sm font-extralight">Currency</span>
            </Table.Head>

            <Table.Body>
              {accounts?.map(({ id, currency, balance }) => {
                return (
                  <Table.Row
                    key={id}
                    onClick={() => handleSelectAccountId(id, currency, balance)}
                    className="cursor-pointer"
                    data-testid={`row-${type}-${id}`}
                  >
                    <Checkbox
                      size="xs"
                      color="primary"
                      checked={accountId === id}
                      onChange={() => {}}
                      data-testid={`checkbox-${type}-${id}`}
                    />

                    <span
                      className="flex min-w-[80px] lg:min-w-[120px]"
                      data-testid={`id-${type}-${id}`}
                    >
                      {id}
                    </span>

                    <span
                      className="flex min-w-[80px] lg:min-w-[120px]"
                      data-testid={`balance-${type}-${id}`}
                    >
                      {balance}
                    </span>

                    <span
                      className="flex min-w-[80px] lg:min-w-[120px]"
                      data-testid={`currency-${type}-${id}`}
                    >
                      {currency}
                    </span>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  )
}

export default AccountSelector
