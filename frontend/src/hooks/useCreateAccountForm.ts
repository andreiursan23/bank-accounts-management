import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateAccountMutation } from '../features/accounts/accountsApiService'
import { CreateOrEditAccountSchema } from '../features/accounts/schemas'
import { Account } from '../features/accounts/types'

const useCreateAccountForm = () => {
  const [createAccount, { isLoading, isSuccess, error, isError, reset: resetStates }] =
    useCreateAccountMutation()

  const onSubmit = async (data: Omit<Account, 'id'>) => {
    createAccount(data)
  }

  const form = useForm<Omit<Account, 'id'>>({
    mode: 'onSubmit',
    resolver: zodResolver(CreateOrEditAccountSchema)
  })

  const { formState, reset } = form

  useEffect(() => {
    if (formState.isSubmitSuccessful && isSuccess) {
      reset()
    }
  }, [formState, reset])

  // Reset errors after 5 seconds
  useEffect(() => {
    if (isError || isSuccess) {
      const timer = setTimeout(() => {
        resetStates()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isError, isSuccess, resetStates])

  return { onSubmit, form, isLoading, isSuccess, error, isError }
}

export default useCreateAccountForm
