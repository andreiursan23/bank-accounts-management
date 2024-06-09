import {
  useGetCreditAccountsByOwnerIdQuery,
  useGetDebitAccountsByOwnerIdQuery
} from '../../features/accounts/accountsApiService'
import { setCreditInfo, setDebitInfo, setMaxAmount } from '../../features/transfers/transfersSlice'
import { RootState } from '../../redux/store'
import { useAppDispatch } from '../../redux/useAppDispatch'
import { useAppSelector } from '../../redux/useAppSelector'
import AccountSelector from './components/AccountSelector/AccountSelector'
import TransferForm from './components/TransferForm/TransferForm'

const CreateTransfer = () => {
  const dispatch = useAppDispatch()

  const { debit, credit } = useAppSelector((state: RootState) => state.transfers)

  const {
    isLoading: debitAccountsLoading,
    isError: debitAccountsError,
    data: debitAccounts
  } = useGetDebitAccountsByOwnerIdQuery(debit.ownerId, {
    skip: !debit.ownerId
  })
  const {
    isLoading: creditAccountsLoading,
    isError: creditAccountsError,
    data: creditAccounts
  } = useGetCreditAccountsByOwnerIdQuery(credit.ownerId, {
    skip: !credit.ownerId
  })

  const showDebitAccounts =
    !!debit.ownerId &&
    !debitAccountsLoading &&
    !debitAccountsError &&
    debitAccounts &&
    debitAccounts.length > 0
  const showCreditAccounts =
    !!credit.ownerId &&
    !creditAccountsLoading &&
    !creditAccountsError &&
    creditAccounts &&
    creditAccounts.length > 0
  const hasBothAccountsSelected = debit.accountId && credit.accountId

  return (
    <div className="flex flex-col max-w-full md:max-w-[70%] lg:max-w-[50%]">
      <div className="mb-12">
        <p className="text-2xl text-primary mb-4">Debit account</p>

        <AccountSelector
          type="debit"
          loading={debitAccountsLoading}
          ownerId={debit.ownerId}
          handleSelectOwnerId={value => dispatch(setDebitInfo({ ...debit, ownerId: value }))}
          showAccounts={showDebitAccounts}
          accounts={debitAccounts}
          handleSelectAccountId={(id, currency, balance) => {
            dispatch(setMaxAmount(balance || 0))
            dispatch(setDebitInfo({ ...debit, accountId: id, currency }))
          }}
          accountId={debit.accountId}
        />
      </div>

      {debit.ownerId && debit.accountId && (
        <div className="mb-10">
          <p className="text-2xl text-primary mb-4">Credit account</p>

          <AccountSelector
            type="credit"
            loading={creditAccountsLoading}
            ownerId={credit.ownerId}
            excludeOwnerId={
              debitAccounts?.length === 1 && debit.ownerId ? debit.ownerId : undefined
            }
            handleSelectOwnerId={value => dispatch(setCreditInfo({ ...debit, ownerId: value }))}
            showAccounts={showCreditAccounts}
            accounts={creditAccounts?.filter(({ id }) => id !== debit.accountId)}
            handleSelectAccountId={(id, currency) => {
              dispatch(setCreditInfo({ ...credit, accountId: id, currency }))
            }}
            accountId={credit.accountId}
          />
        </div>
      )}

      {hasBothAccountsSelected && <TransferForm />}
    </div>
  )
}

export default CreateTransfer
