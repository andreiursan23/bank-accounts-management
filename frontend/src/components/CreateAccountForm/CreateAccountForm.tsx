import { FC } from 'react'
import { Button } from 'react-daisyui'
import { Controller } from 'react-hook-form'
import useCreateAccountForm from '../../hooks/useCreateAccountForm'
import { DEFAULT_ERROR_MESSAGE } from '../../redux/utils'
import { Input, Select } from '../../ui'

const CreateAccountForm: FC = () => {
  const { onSubmit, form, isLoading, isSuccess, error, isError } = useCreateAccountForm()

  const { handleSubmit, register, formState, control } = form
  const { errors } = formState
  const { ownerId, currency, balance } = errors

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-6 border-solid border-[1px] border-primary rounded lg:w-80"
      >
        <Input
          {...register('ownerId')}
          id="ownerId"
          label="Owner ID"
          placeholder="example: 2"
          type="number"
          errorMessage={ownerId?.message}
        />

        <Input
          {...register('balance')}
          id="balance"
          label="Balance"
          placeholder="example: 1450"
          type="number"
          errorMessage={balance?.message}
        />

        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <Select
              id="currency"
              label="Currency"
              placeholder="Currency"
              errorMessage={currency?.message}
              // @TODO: clean this up to come from map of Currencies enum
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'EUR', label: 'EUR' },
                { value: 'GBP', label: 'GBP' }
              ]}
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          color="primary"
          variant="outline"
          className="mt-1"
          loading={isLoading}
        >
          {isLoading ? 'Loading' : 'Create account'}
        </Button>
      </form>

      {isError && (
        <p className="text-red-500 mt-2">
          {error?.message ? <>Sorry: {error?.message}</> : DEFAULT_ERROR_MESSAGE}
        </p>
      )}

      {isSuccess && <p className="text-green-500 mt-2">Account created successfully</p>}
    </>
  )
}

export default CreateAccountForm
