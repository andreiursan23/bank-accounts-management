import { WarningTriangle } from 'iconoir-react'
import { Button } from 'react-daisyui'
import useCreateTransferForm from '../../../../hooks/useCreateTransferForm'
import { RootState } from '../../../../redux/store'
import { useAppSelector } from '../../../../redux/useAppSelector'
import { DEFAULT_ERROR_MESSAGE } from '../../../../redux/utils'
import { Input } from '../../../../ui'

const TransferForm = () => {
  const { debit, credit } = useAppSelector((state: RootState) => state.transfers)

  const {
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
  } = useCreateTransferForm()

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('amount')}
          id="amount"
          label={`Transfer amount (${debit.currency})`}
          placeholder="example: 150"
          type="number"
          errorMessage={amount?.message}
        />

        {hasDifferentCurrencies && (
          <div className="mb-6">
            <div className="flex gap-1 mt-2 mb-6 p-2 items-center border-solid border-[1px] border-warning rounded w-fit bg-warning">
              <WarningTriangle className="text-white" />
              <p className="text-white">The two accounts have different currencies</p>
            </div>

            {convertedAmount ? (
              <p className="text-lg">
                After conversion the sum to be transferred is{' '}
                <span className="font-bold text-primary" data-testid="converted-amount">
                  {convertedAmount} {credit.currency}
                </span>
              </p>
            ) : null}
          </div>
        )}

        <Button
          type="submit"
          color="primary"
          variant="outline"
          className="mt-1"
          size="lg"
          loading={isLoading}
          disabled={hasErrors}
        >
          {isLoading ? 'Loading' : 'Create transfer'}
        </Button>

        {isSuccess && <p className="text-green-500 mt-2">Transfer created successfully</p>}
      </form>

      {isError && (
        <p className="text-red-500 mt-2">
          {error?.message ? <>Sorry: {error?.message}</> : DEFAULT_ERROR_MESSAGE}
        </p>
      )}
    </>
  )
}

export default TransferForm
