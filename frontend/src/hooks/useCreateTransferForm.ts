import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { getTransferSchema } from '../features/transfers/schemas'
import { useCreateTransferMutation } from '../features/transfers/transfersApiService'
import { Transfer } from '../features/transfers/types'
import { RootState } from '../redux/store'
import { useAppSelector } from '../redux/useAppSelector'
import useCurrencyConverter from './useCurrencyConvertor'

const useCreateTransferForm = () => {
  // States and variables
  const { debit, credit, maxAmount } = useAppSelector((state: RootState) => state.transfers)
  const [convertedAmount, setConvertedAmount] = useState<number | undefined>(undefined)
  const hasDifferentCurrencies = debit.currency !== credit.currency
  const TransferSchema = getTransferSchema(maxAmount)

  // Form
  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    resetField
  } = useForm<Transfer>({
    mode: 'onChange',
    resolver: zodResolver(TransferSchema)
  })

  const { fromAccountId, toAccountId, amount } = errors
  const hasErrors = !!(fromAccountId?.message || toAccountId?.message || amount?.message)

  const amountValue = useWatch({
    control,
    name: 'amount'
  })

  // Conversion
  const { convert } = useCurrencyConverter()
  useEffect(() => {
    if (!debit.currency || !credit.currency) {
      return
    }

    setConvertedAmount(convert(amountValue > 0 ? amountValue : 0, debit.currency, credit.currency))
  }, [debit.currency, credit.currency, amountValue])

  // Form submit
  const [createTransfer, { isLoading, isSuccess, error, isError, reset: resetStates }] =
    useCreateTransferMutation()

  useEffect(() => {
    if (!debit.accountId || !credit.accountId) {
      return
    }

    setValue('fromAccountId', debit.accountId)
    setValue('toAccountId', credit.accountId)
  }, [debit.accountId, credit.accountId])

  const onSubmit = async (data: Transfer) => {
    if (hasDifferentCurrencies && convertedAmount) {
      data.amount = convertedAmount
    }

    createTransfer(data)
  }

  useEffect(() => {
    if (isSuccess) {
      resetField('amount')
    }
  }, [isSuccess])

  return {
    register,
    handleSubmit,
    onSubmit,
    amount,
    hasDifferentCurrencies,
    convertedAmount,
    isLoading,
    hasErrors,
    isSuccess,
    isError,
    error
  }
}

export default useCreateTransferForm
