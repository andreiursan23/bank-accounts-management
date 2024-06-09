import { EditPencil, FloppyDisk, Trash, WarningTriangle } from 'iconoir-react'
import { FC } from 'react'
import { Button, Table } from 'react-daisyui'
import { Controller } from 'react-hook-form'
import { setSearchTerm } from '../../features/accounts/accountsSlice'
import useAccountsDataAndActions from '../../hooks/useAccountsDataAndActions'
import useEditAccountForm from '../../hooks/useEditAccountForm'
import { RootState } from '../../redux/store'
import { useAppDispatch } from '../../redux/useAppDispatch'
import { useAppSelector } from '../../redux/useAppSelector'
import { DEFAULT_ERROR_MESSAGE } from '../../redux/utils'
import { Input, Loader, Select } from '../../ui'

interface OwnProps {
  limitedView?: boolean
}

const AccountsTable: FC<OwnProps> = ({ limitedView = false }) => {
  const dispatch = useAppDispatch()
  const { edit, disabled, searchTerm } = useAppSelector((state: RootState) => state.accounts)

  const { actions, data } = useAccountsDataAndActions()
  const { editAccount, deleteAccount } = actions
  const { accounts, isLoading, isError } = data

  const { register, control, errors, hasErrors, handleEditAccount, handleSaveAccount } =
    useEditAccountForm({
      accounts,
      editAccount
    })
  const accountsToRender = limitedView ? accounts.slice(0, 5) : accounts

  return (
    <>
      {limitedView ? null : (
        <Input
          value={searchTerm}
          onChange={e => {
            dispatch(setSearchTerm(e.target.value))
          }}
          id="search"
          placeholder="Search by any field"
          label="Search"
          classNames="!w-64 mb-4"
        />
      )}

      {isLoading ? (
        <div className="mx-auto max-w-6xl py-20 px-10 flex justify-center border-solid border-[1px] border-primary rounded">
          <Loader />
        </div>
      ) : accounts.length === 0 ? (
        <span className="flex gap-1 items-center">
          <WarningTriangle className="text-warning" />
          <p className="text-warning">No accounts.</p>
        </span>
      ) : (
        <div className="overflow-x-auto p-6 border-solid border-[1px] border-primary rounded">
          {isError && <p className="text-red-500 mb-2">{DEFAULT_ERROR_MESSAGE}</p>}

          <Table>
            <Table.Head>
              <span>Owner ID</span>
              <span>Balance</span>
              <span>Currency</span>
              {limitedView ? null : <span>Actions</span>}
            </Table.Head>

            <Table.Body>
              {accountsToRender.map(({ id, ownerId, currency, balance }) => {
                return (
                  <Table.Row key={id}>
                    <span
                      className="flex min-w-[80px] lg:min-w-[222px] items-center"
                      data-testid={`ownerId-${id}`}
                    >
                      {edit[id] ? (
                        <Input
                          {...register('ownerId')}
                          id="ownerId"
                          placeholder="example: 2"
                          type="number"
                          errorMessage={errors.ownerId?.message}
                          classNames="pt-4"
                          data-testid={`ownerId-input-${id}`}
                        />
                      ) : (
                        <>{ownerId}</>
                      )}
                    </span>

                    <span
                      className="flex min-w-[80px] lg:min-w-[222px]"
                      data-testid={`balance-${id}`}
                    >
                      {edit[id] ? (
                        <Input
                          {...register('balance')}
                          id="balance"
                          placeholder="example: 1450"
                          type="number"
                          errorMessage={errors.balance?.message}
                          classNames="pt-4"
                          data-testid={`balance-input-${id}`}
                        />
                      ) : (
                        <>{balance}</>
                      )}
                    </span>

                    <span
                      className="flex min-w-[80px] lg:min-w-[222px]"
                      data-testid={`currency-${id}`}
                    >
                      {edit[id] ? (
                        <Controller
                          name="currency"
                          control={control}
                          render={({ field }) => (
                            <Select
                              id="currency"
                              placeholder="Currency"
                              errorMessage={errors.currency?.message}
                              // @TODO: clean this up to come from map of Currencies enum
                              options={[
                                { value: 'USD', label: 'USD' },
                                { value: 'EUR', label: 'EUR' },
                                { value: 'GBP', label: 'GBP' }
                              ]}
                              classNames="pt-4"
                              data-testid={`currency-input-${id}`}
                              {...field}
                            />
                          )}
                        />
                      ) : (
                        <>{currency}</>
                      )}
                    </span>

                    {limitedView ? (
                      <></>
                    ) : (
                      <span className="flex gap-1">
                        {edit[id] ? (
                          <Button
                            color="primary"
                            shape="circle"
                            className="p-1"
                            startIcon={<FloppyDisk color="#f7fafd" className="w-6 h-6" />}
                            onClick={() => handleSaveAccount({ id, ownerId, currency, balance })}
                            disabled={hasErrors}
                            aria-label="save"
                            data-testid={`save-${id}`}
                          ></Button>
                        ) : (
                          <Button
                            color="primary"
                            shape="circle"
                            className="p-1"
                            startIcon={<EditPencil color="#f7fafd" className="w-6 h-6" />}
                            onClick={() => handleEditAccount({ id, ownerId, currency, balance })}
                            disabled={disabled[id]}
                            aria-label="edit"
                            data-testid={`edit-${id}`}
                          ></Button>
                        )}

                        <Button
                          color="primary"
                          shape="circle"
                          className="p-1"
                          startIcon={<Trash color="#f7fafd" className="w-6 h-6" />}
                          onClick={() => deleteAccount(id)}
                          aria-label="delete"
                          data-testid={`delete-${id}`}
                        ></Button>
                      </span>
                    )}
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  )
}

export default AccountsTable
