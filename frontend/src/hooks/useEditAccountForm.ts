import { zodResolver } from '@hookform/resolvers/zod'
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { BaseQueryFn, MutationDefinition } from '@reduxjs/toolkit/query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { initializeDisabled, toggleEdit } from '../features/accounts/accountsSlice'
import { CreateOrEditAccountSchema } from '../features/accounts/schemas'
import { Account } from '../features/accounts/types'
import { useAppDispatch } from '../redux/useAppDispatch'
import { CustomError, QueryParams } from '../redux/utils'

interface EditAccountFormProps {
  accounts: Account[]
  editAccount: MutationTrigger<
    MutationDefinition<
      {
        id: number
        account: Omit<Account, 'id'>
      },
      BaseQueryFn<QueryParams, unknown, CustomError>,
      'Accounts',
      Account,
      'accountsApi'
    >
  >
}

const useEditAccountForm = ({ accounts, editAccount }: EditAccountFormProps) => {
  const dispatch = useAppDispatch()

  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm<Omit<Account, 'id'>>({
    mode: 'onChange',
    resolver: zodResolver(CreateOrEditAccountSchema)
  })

  useEffect(() => {
    dispatch(initializeDisabled({ accounts: accounts || [] }))
  }, [accounts])

  const handleEditAccount = ({ id, ownerId, currency, balance }: Account) => {
    dispatch(toggleEdit({ id, accounts: accounts || [] }))

    setValue('ownerId', ownerId)
    setValue('currency', currency)
    setValue('balance', balance)
  }

  const handleSaveAccount = ({ id, ownerId, currency, balance }: Account) => {
    dispatch(toggleEdit({ id, accounts: accounts || [] }))

    handleSubmit(data => onSubmitEditedAccount({ id, ownerId, currency, balance }, data))()
  }

  const onSubmitEditedAccount = (account: Account, data: Omit<Account, 'id'>) => {
    if (
      account.ownerId === data.ownerId &&
      account.currency === data.currency &&
      account.balance === data.balance
    ) {
      return
    }

    editAccount({ id: account.id, account: data })
  }

  const hasErrors = !!errors.ownerId || !!errors.balance || !!errors.currency

  return {
    register,
    control,
    errors,
    hasErrors,
    handleEditAccount,
    handleSaveAccount
  }
}

export default useEditAccountForm
